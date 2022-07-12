terraform {
  backend "s3" {
  endpoint = "https://nyc3.digitaloceanspaces.com"
  region = "us-east-1"
  bucket = "sonalysis-media-space" // name of your space
  key = "sonalysistfstate/terraform.tfstate"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  }

  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.6.0"
    }

    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
  }
}  
provider "digitalocean" {
    #token = var.api_token
}

#create Kubernetes deployment
resource "digitalocean_kubernetes_cluster" "sonalysis-k8s-1-22-8-do" {
  name   = "sonalysis-k8s-1-22-8-do"
  region = "nyc3"
  version = "1.22.8-do.1"

  node_pool {
    name       = "pool-sonalysis"
    size       = "s-2vcpu-4gb-intel"
    node_count = 2
  }
}
