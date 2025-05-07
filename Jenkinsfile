pipeline {
  agent any

  environment {
    COMPOSE_CMD = "docker compose"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
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
}
