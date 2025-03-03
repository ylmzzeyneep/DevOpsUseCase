pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ylmzzeyneep/frontend:v1'   
        BACKEND_IMAGE = 'ylmzzeyneep/backend:v1'
        REGISTRY = 'docker.io'
        SONARQUBE_URL = 'http://34.41.204.28:9000'  
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ylmzzeyneep/DevOpsUseCase.git'
            }
        }

         stage('SonarQube Analysis') {
             steps {
                 withSonarQubeEnv('SonarQube-Scanner') {
                     sh '''
                         cd ${WORKSPACE}
                         sonar-scanner \
                         -Dsonar.projectKey=DevOpsUseCase \
                         -Dsonar.sources=./ \
                         -Dsonar.host.url=$SONARQUBE_URL \
                         -Dsonar.login=${SONAR_TOKEN}
                     '''
                 }
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

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
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

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: true
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
