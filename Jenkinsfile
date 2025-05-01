pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                 script {
                     def version = (readFile('README.md') =~ /<version>(\d+\.\d+\.\d+)<\/version>/)[0][1]
                     env.VERSION = version
                     sh "docker build -t gorsaakyan/age-calc:${env.VERSION} ."
                 }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-PAT-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
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
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-PAT-credentials', passwordVariable: "PASS", usernameVariable: "USER")]) {
                            sh """
                                    echo \$PASS | docker login -u \$USER --password-stdin
                                    docker pull gorsaakyan/age-calc:${env.VERSION}
                                    docker stop age-calc || true
                                    docker rm age-calc || true
                                    docker run -d --name age-calc -p 3001:3001 gorsaakyan/age-calc:${env.VERSION}
                            """
                    }
                }
            }
        }
    }
}