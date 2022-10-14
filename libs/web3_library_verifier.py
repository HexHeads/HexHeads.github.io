import hashlib
import requests

if __name__ == "__main__":
    with open("web3.min.js") as file:
        local_library = file.read().encode("UTF-8")
        used_lib_md5_digest = hashlib.md5(local_library).hexdigest()

    # RAW for https://github.com/web3/web3.js/blob/6311abe8cedd70a2863edee8adc381eb63515da4/dist/web3.min.js
    remote_library = requests.get("https://raw.githubusercontent.com/web3/web3.js/6311abe8cedd70a2863edee8adc381eb63515da4/dist/web3.min.js").text.encode("UTF-8")
    remote_lib_md5_digest = hashlib.md5(remote_library).hexdigest()

    print("Used Library Hash:", used_lib_md5_digest)
    print("Remote Library Hash:", remote_lib_md5_digest)
    print("Match:", used_lib_md5_digest == remote_lib_md5_digest)
