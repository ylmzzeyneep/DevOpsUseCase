pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'docker-hub-credentials' 
        BACKEND_IMAGE = 'ylmzzeyneep/backend:v2' 
        FRONTEND_IMAGE = 'ylmzzeyneep/frontend:v1' 
    }
        
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ylmzzeyneep/DevOpsUseCase.git'
            }
        }
        stage('Build Backend Image') {
            steps {
                script {
                    sh 'docker build -t $BACKEND_IMAGE ./backend'
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                }
            }
        }
        stage('Snyk Authentication') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
                        sh 'snyk auth $SNYK_TOKEN'
                    }
                }
            }
        }

        stage('Snyk Security Scan') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
                        sh 'snyk test --severity-threshold=high || true'
                    }
                }
            }
        }
      
        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                script {
                    sh 'docker push $BACKEND_IMAGE'
                }
            }
        }
        stage('Push Frontend Image') {
            steps {
                script {
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }
    }
}
