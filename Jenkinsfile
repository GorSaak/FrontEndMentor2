pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
              script {
                // 1) Read the file and dump its first 200 chars so we can be sure we actually loaded it
                def content = readFile('README.md')
                echo ">>> README content preview:\n${content.take(200).replaceAll(/\n/, '\\n')}"

                // 2) Use an explicit Matcher for clarity, capturing only digits-and-dots
                def matcher = (content =~ /<version>\s*([\d\.]+)\s*<\/version>/)

                // 3) Fail fast if no match
                if (!matcher.find()) {
                  error """
                    ❌ Unable to find a <version>x.y.z</version> tag in README.md!
                    Make sure the file exists and contains exactly <version>4.1.0</version> (no extra casing/spaces).
                  """
                }

                // 4) Extract the version and trim any whitespace
                def version = matcher.group(1).trim()
                echo "✅ Parsed version = [${version}]"

                // 5) Export to env and verify
                env.VERSION = version
                echo ">>> env.VERSION = [${env.VERSION}]"

                // 6) Build your Docker image
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