pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('npm') {
            steps {
                sh 'npm -v'
            }
        }
        stage('git clone') {
            steps {
                git branch: 'main', credentialsId: 'GITHUB_CRED', url: 'https://github.com/JAER12392/simple-calculator-snyk.git'
			
            }
        }
        stage('Snyk Install') {
            
            steps {
                withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
                    sh 'npm install -g snyk'
                    sh 'snyk auth ${SNYK_TOKEN}'
                }
            }
          
        }
        stage('Snyk to HTML install') {
            steps {
                sh 'npm install -g snyk-to-html'
            }
        }
        stage('Snyk Code Test') {
            steps {
                catchError(buildResult:"SUCCESS", stageResult: 'FAILURE') {
                    sh 'snyk code test --severity-threshold=high --json-file-output=code-results.json'
                }
            }
        }
        stage('Snyk to HTML - code') {
            steps {
                sh 'snyk-to-html -i code-results.json -o code-results.html'
            }
        }
        stage('Snyk Open Source Test') {
            steps {
                catchError(buildResult:"SUCCESS", stageResult: 'FAILURE') {
                    sh 'snyk test --severity-threshold=high --json-file-output=os-results.json'
                }
            }
        }
        stage('Snyk to HTML - OS') {
            steps {
                sh 'snyk-to-html -i os-results.json -o os-results.html'
            }
        }
        stage('Publish OS Artifact') {
            steps {
                publishHTML (target : [allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.',
                    reportFiles: 'os-results.html',
                    reportName: 'Snyk Open Source',
                    reportTitles: 'Snyk Open Source'])
            }
        }
        stage('Snyk Open Source Monitor') {
            steps {
                catchError(buildResult:"SUCCESS", stageResult: 'FAILURE') {
                    sh 'snyk monitor --severity-threshold=high'
                }
            }
        }
    }
}
