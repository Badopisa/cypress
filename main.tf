terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Parallelscore"

    workspaces {
      name = "parallelscore_work"
    }
  }
  
  required_providers {
  digitalocean = {
    source = "digitalocean/digitalocean"
    }
  }
}  
provider "digitalocean" {
    #token = var.api_token
}

resource "digitalocean_droplet" "sonalysis" {
   count = 1
   name = "sonalysis-${count.index}"
   image = "ubuntu-20-04-x64"
   size = "s-1vcpu-1gb"
   region = "LON1"
   ssh_keys = [
        var.ssh_fingerprint
   ]
   
}
