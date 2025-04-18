

output "us_east_2_vpc_id" {
    description = "value of the VPC east 2"
    value = module.base_network_us_east_2.vpc_id
}
output "us_west_2_vpc_id" {
    description = "value of the VPC west 2"
    value = module.base_network_us_west_2.vpc_id
}
output "us_east_2_security_groups_id" {
    description = "value of the security group id"
    value = module.base_network_us_east_2.security_groups_id
}
output "us_west_2_security_groups_id" {
    description = "value of the security group id"
    value = module.base_network_us_west_2.security_groups_id
}