import socket


def banner_grabber(host_ip, port):
  client_socket = socket.socket()
  client_socket.connect((host_ip, int(port)))
  print(client_socket.recv(1024).decode().rstrip('\r\n'))


def main():
  host_ip = input("Enter Host IP Address : ")
  port = str(input("Enter Port Number     : "))
  banner_grabber(host_ip, port)


main()
