pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def content = readFile('README.md')
                    def version = content.find(/<version>(.+?)<\/version>/) { full, v -> v?.trim() }
                    if (!version) {
                        error "❌ Version tag missing in README.md"
                    }
                    env.VERSION = version
                    sh "docker build -t gorsaakyan/age-calc:${env.VERSION} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'Docker-hub-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
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