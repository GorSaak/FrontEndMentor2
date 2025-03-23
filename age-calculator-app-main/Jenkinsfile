pipeline {

    agent any

	tools {

	}
	enviroment {

	}

	stages {
		stage(“build docker image”) {
			steps {
			    sh ‘docker build -t age-calc:2.0.0’
			}

		stages {
		stage(“image to docker-hub”) {
			steps {
                echo 'image to dicker'
			}
		stage(“deploy in ec2”) {
			steps {
				echo “All is done”
			}
		}
	}
}