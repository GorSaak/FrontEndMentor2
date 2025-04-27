pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                 script {
                   def content = readFile('README.md')
                   echo ">>> README content preview:\n${content.take(200).replaceAll(/\n/, '\\n')}"

                   def matcher = (content =~ /<version>\s*([\d\.]+)\s*<\/version>/)

                   if (!matcher.find()) {
                     error "❌"
                   }

                   def version = matcher.group(1).trim()
                   echo "✅ Parsed version = [${version}]"

                   env.VERSION = version
                   echo ">>> env.VERSION = [${env.VERSION}]"

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
                   sh 'ssh -o StrictHostKeyChecking=no ec2-user@51.20.107.245'
                   sh "ssh docker pull gorsaakyan/age-calc:${env.VERSION}"
                   sh "docker run -d --name age-calc:${env.VERSION} -p 3000:3000 gorsaakyan/age-calc:${env.VERSION}"
                }
            }
        }
    }
}