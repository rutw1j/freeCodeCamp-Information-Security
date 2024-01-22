import nmap

# nmap_path = "E:/Program Files/Python 3.12/Scripts/"
# portscanner = nmap.PortScanner(nmap_search_path=nmap_path)

portscanner = nmap.PortScanner()

print("Welcome to NMAP Automation Tool\n\n")
ip_address = input("Enter IP Address to Scan:")
print("Entered IP Address:", ip_address)

type(ip_address)

choice = input("""\nSCAN TYPE TO RUN
                    1.  SYN ACK Scan
                    2.  UDP Scan
                    3.  Comprehensive Scan
                    0.  Exit\n
                    Enter Your Choice:""")
print("\n\n", choice, "Initiated")

if choice == 1:
  print("NMAP Version      :", portscanner.nmap_version())
  portscanner.scan(ip_address, '1-1024', '-v -sS')
  print("NMAP Scanner Info :", portscanner.scaninfo())
  print("IP Status         :", portscanner[ip_address].state())
  print("Protocols         : ", portscanner[ip_address].all_protocols())
  print("Open Ports        :", portscanner[ip_address]['tcp'].keys())
elif choice == 2:
  print("NMAP Version      :", portscanner.nmap_version())
  portscanner.scan(ip_address, '1-1024', '-v -sU')
  print("NMAP Scanner Info :", portscanner.scaninfo())
  print("IP Status         :", portscanner[ip_address].state())
  print("Protocols         : ", portscanner[ip_address].all_protocols())
  print("Open Ports        :", portscanner[ip_address]['udp'].keys())
elif choice == 3:
  print("NMAP Version      :", portscanner.nmap_version())
  portscanner.scan(ip_address, '1-1024', '-v -sS -sV -C -A -O')
  print("NMAP Scanner Info :", portscanner.scaninfo())
  print("IP Status         :", portscanner[ip_address].state())
  print("Protocols         : ", portscanner[ip_address].all_protocols())
  print("Open Ports        :", portscanner[ip_address]['tcp'].keys())
elif choice == 0:
  print("\n\nPROGRAM EXITED\n\n")
  exit()
else:
  print("Enter Valid Option for Scan")
