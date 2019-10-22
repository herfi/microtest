#!/usr/bin/env groovy 

/*
 *  This file bootstraps the codified Continuous Delivery pipeline for extensions of SAP solutions, such as SAP S/4HANA.
 * The pipeline helps you to deliver software changes quickly and in a reliable manner.
 * A suitable Jenkins instance is required to run the pipeline.
 * The Jenkins can easily be bootstraped using the life-cycle script located inside the 'cx-server' directory.
 *
 *  More information on getting started with Continuous Delivery can be found in the following places:
 *   - GitHub repository: https://github.com/SAP/cloud-s4-sdk-pipeline
 *   - Blog Post: https://blogs.sap.com/2017/09/20/continuous-integration-and-delivery
 */

/*
 * Set pipelineVersion to a fixed released version (e.g. "v15") when running in a productive environment.
 * To find out about available versions and release notes, visit: https://github.com/SAP/cloud-s4-sdk-pipeline/releases
 */
/*String pipelineVersion = "master"

node {
    deleteDir()
    sh "git clone --depth 1 https://github.com/SAP/cloud-s4-sdk-pipeline.git -b ${pipelineVersion} pipelines"
    load './pipelines/s4sdk-pipeline.groovy'
}*/
@Library('piper-lib-os') _
pipeline() { 
agent any
    stages {
        stage('prepare') {
            steps {
                checkout scm
                setupCommonPipelineEnvironment script:this
             }
        }
        
        stage('build') {
            steps {
                mtaBuild script: this
             }
        }
        stage('deploy_dev') {
            when {
                branch 'dev'

            } 
            steps {   
                cloudFoundryDeploy(
                    script: this, 
                    deployTool:'mtaDeployPlugin', 
                    dockerImage: 'ppiper/cf-cli',
                    cloudFoundry: [credentialsId: 'ce6f3d8d-4608-4869-9076-e69e9e36e4c4', manifest: 'cfManifest', org: 'P2001798219trial_trial', space: 'dev'],
                )
             }
        
        }
        stage('deploy_int') {
            when {
                branch 'master'

            }
            steps {    
                cloudFoundryDeploy(
                    script: this, 
                    deployTool:'mtaDeployPlugin', 
                    dockerImage: 'ppiper/cf-cli',
                    cloudFoundry: [credentialsId: 'ce6f3d8d-4608-4869-9076-e69e9e36e4c4', manifest: 'cfManifest', org: 'P2001798219trial_trial', space: 'int'],
                )
            }
            
        }
    }
}