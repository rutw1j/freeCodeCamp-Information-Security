import socket

input_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
input_socket.settimeout(10)

host_ip = input("Enter the IP address  : ")
port = int(input("Enter the Port Number : "))


def port_scanner(port):
  if input_socket.connect_ex((host_ip, port)):
    print(f"Port {port} is closed")
  else:
    print(f"Port {port} is open")


port_scanner(port)
