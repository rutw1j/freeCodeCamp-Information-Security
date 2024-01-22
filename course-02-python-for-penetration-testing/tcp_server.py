import socket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

hostname = socket.gethostname()
port = 4004

server_socket.bind((hostname, port))
server_socket.listen(3)

while (True):
  client_socket, address = server_socket.accept()
  print("Connection Recieved from" % str(address))
  message = "-- Connected to the Server --" + "\r\n"
  client_socket.send(message.encode('ascii'))
  client_socket.close()
