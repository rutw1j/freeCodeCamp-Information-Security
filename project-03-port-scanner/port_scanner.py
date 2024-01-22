import ipaddress
import socket

import requests

from common_ports import ports_and_services


def is_valid_url(url):
  try: 
    send_request = requests.get("https://" + url, stream=True, timeout=3)
  except:
    try:
      send_request = requests.get("http://" + url, stream=True, timeout=3)
    except:
      return False
  return True


def is_valid_ip(ip):
  try:
    ipaddress.ip_address(ip)
    return True
  except ValueError:
    return False


def get_target_info(target):
  target_url, target_ip = "", ""
  
  if target[0].isdigit():
    if is_valid_ip(target):
      target_ip = target
      try:
        target_url = socket.gethostbyaddr(target)[0]
      except socket.herror:
        target_url = None
    else:
      print("Error: Invalid IP address")
  elif target[0].isalpha():
    if is_valid_url(target):
      target_url = target
      target_ip = socket.gethostbyname(target)
    else:
      print("Error: Invalid hostname")
  
  return target_url, target_ip


def get_open_ports(target, port_range, verbose=False):
  open_ports = []

  target_url, target_ip = get_target_info(target)

  for port in range(port_range[0], port_range[1] + 1):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    if not(s.connect_ex((target_ip, port))):
      open_ports.append(port)
    s.close() 

  if verbose:
    if target_url is None:
      print(f'\nOpen ports for {target_ip}')
    else:
      print(f'\nOpen ports for {target_url} ({target_ip})')
    print('PORT     SERVICE')
    for port in open_ports:
      print(f'{port:<8} {ports_and_services[port]}')
    return ""

  return open_ports
