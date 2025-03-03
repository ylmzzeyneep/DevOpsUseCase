pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ylmzzeyneep/frontend:v1'   
        BACKEND_IMAGE = 'ylmzzeyneep/backend:v1'
        DOCKER_USER = 'ylmzzeyneep'
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

       stage("Docker Deploy To Dev Env"){
            steps{
                script{
                    withDockerRegistry(credentialsId: 'deneme', toolName: 'docker'){
                        sh "docker pull ${BACKEND_IMAGE}"
                        sh "docker pull ${FRONTEND_IMAGE}"
                        sh "docker run -d -p 8080:8080 ${BACKEND_IMAGE}"
                        sh "docker run -d -p 80:80 ${BACKEND_IMAGE}"
                    
                    }
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
