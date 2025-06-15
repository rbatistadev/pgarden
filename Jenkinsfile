pipeline {
  agent any

  environment {
    COMPOSE_CMD = 'docker compose'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare .env File') {
      steps {
        withCredentials([file(credentialsId: 'nestjs-env-file', variable: 'DOTENV_FILE')]) {
          sh 'cp $DOTENV_FILE .env'
        }
      }
    }

    stage('Build Images') {
      steps {
        sh "${COMPOSE_CMD} build --no-cache"
      }
    }

    stage('Deploy') {
      steps {
        sh "${COMPOSE_CMD} down || true"
        sh "${COMPOSE_CMD} up -d"
      }
    }
  }

  post {
    always {
      sh 'rm -f .env'
    }
  }
}
