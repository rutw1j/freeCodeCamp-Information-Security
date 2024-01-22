import hashlib

def crack_sha1_hash(input_hash, use_salts=False):
  
  with open('top-10000-passwords.txt', 'r') as file:
    file_content = file.readlines()
  
  if use_salts:
    with open('known-salts.txt', 'r') as file:
      salts = file.readlines()
  
    for passwd in file_content:
      for salt in salts:
        hash_value1 = hashlib.sha1(salt.strip().encode('utf-8') + passwd.strip().encode('utf-8')).hexdigest()
        if hash_value1 == input_hash:
          return passwd.strip()
        hash_value2 = hashlib.sha1(passwd.strip().encode('utf-8') + salt.strip().encode('utf-8')).hexdigest()
        if hash_value2 == input_hash:
          return passwd.strip()
  else:
    for passwd in file_content:
      hash_value = hashlib.sha1(passwd.strip().encode('utf-8')).hexdigest()
      if hash_value == input_hash:
        return passwd.strip()
  
  return "PASSWORD NOT IN DATABASE"