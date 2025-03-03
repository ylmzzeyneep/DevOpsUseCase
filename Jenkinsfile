pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ylmzzeyneep/frontend:v1'   
        BACKEND_IMAGE = 'ylmzzeyneep/backend:v1'
        DOCKER_HUB_CRED = credentials('ylmzzeyneep/dockerhub')
        REGISTRY = 'docker.io'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ylmzzeyneep/DevOpsUseCase.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh "docker build -t ${BACKEND_IMAGE} ./backend"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                }
            }
        }

       stage('Docker login') {
            steps {
                echo 'Logging in to DockerHub'
                script {
                    sh "echo ${DOCKER_HUB_CRED_PSW} | docker login -u ${DOCKER_HUB_CRED_USR} --password-stdin"
                    sh "docker image prune --force"
                }
            }
        }


        stage('Push Backend Image') {
            steps {
                script {
                    sh "docker push ${BACKEND_IMAGE}"
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${BACKEND_IMAGE} ${FRONTEND_IMAGE}"
            }
        }
    }
}
