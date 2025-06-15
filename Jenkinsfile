pipeline {
  agent any

  environment {
    DOTENV = credentials('nestjs-dotenv')
    COMPOSE_CMD = "docker compose"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    stage('Prepare .env File') {
      steps {
        script {
          writeFile file: '.env', text: "${DOTENV}"
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
}
