import qrcode
qr = qrcode.make("https://frimzy55.github.io/my_app/")
qr.show()
qr.save("my_app_qr.png")
