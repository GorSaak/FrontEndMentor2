pipeline {
    agent {
            docker {
                image 'node:18-alpine'  // Используйте любой образ
                args '-v /var/run/docker.sock:/var/run/docker.sock'
            }
        }
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t age-calc:2.0.0 .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2'
            }
        }
    }
}