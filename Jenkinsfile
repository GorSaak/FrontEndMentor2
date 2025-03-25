pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gorsaakyan/age-calc:2.0.0 .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push gorsaakyan/age-calc:2.0.0'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2'
            }
        }
    }
}