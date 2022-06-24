output "droplet_ip_addresses" {
  value = {
    for droplet in digitalocean_droplet.sonalysis:
    droplet.name => droplet.ipv4_address
  }
}
 output "username" {
  value = {
    for droplet in digitalocean_droplet.sonalysis:
    droplet.name => droplet.name
  }
}
