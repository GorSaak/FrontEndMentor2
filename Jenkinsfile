pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                def matcher = readFile('README.md') =~ '<version>(.+)</version>'
                def version = matcher[0][1]
                env.IMAGE_NAME = "$version-$BUILDNUMBER"
                echo IMAGE_NAME
                sh 'docker build -t gorsaakyan/age-calc:3.0.0 .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push gorsaakyan/age-calc:3.0.0'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2'
                sshagent(['ec2-server-key']) {
                    sh 'ssh'
                }
            }
        }
    }
}