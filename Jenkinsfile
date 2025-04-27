pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                 script {
                     def env.VERSION = (readFile('README.md') =~ /<version>(\d+\.\d+\.\d+)<\/version>/)[0][1]
                     sh "docker build -t gorsaakyan/age-calc:${env.VERSION} ."
                 }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'Docker-hub-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
                    sh """#!/bin/bash
                    echo \$PASS | docker login -u \$USER --password-stdin
                    docker push gorsaakyan/age-calc:${env.VERSION}
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2'
                sshagent(['EC2-SSH-credentials']) {
                    sh """
                        ssh -T -o StrictHostKeyChecking=no ec2-user@51.20.107.245 '
                            docker stop age-calc-${env.VERSION} || true
                            docker rm age-calc-${env.VERSION} || true
                            docker pull gorsaakyan/age-calc:${env.VERSION}
                            docker run -d --name age-calc-${env.VERSION} -p 3000:3000 gorsaakyan/age-calc:${env.VERSION}
                        '
                    """
                }
            }
        }
    }
}