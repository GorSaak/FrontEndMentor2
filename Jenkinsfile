pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // 1) Read the file once
                    def content = readFile('README.md')

                    // 2) Extract the version string in one go (no Matcher saved in env or fields)
                    def version = content.find(/<version>(.+?)<\/version>/) { full, v -> v?.trim() }

                    if (!version) {
                        error "❌ Version tag missing in README.md"
                    }

                    // 3) Expose to the env if you really need to downstream
                    env.VERSION = version

                    // 4) Build your image
                    sh "docker build -t gorsaakyan/age-calc:${env.VERSION} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push gorsaakyan/age-calc:${env.VERSION}'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2'
                sshagent(['ec2-server-key']) {
                   sh 'ssh -o StrictHostKeyChecking=no ec2-user@13.51.167.66'
                   sh "ssh docker pull gorsaakyan/age-calc:${env.VERSION}"
                   sh "docker run -d --name age-calc:${env.VERSION} -p 3000:3000 gorsaakyan/age-calc:${env.VERSION}"
                }
            }
        }
    }
}