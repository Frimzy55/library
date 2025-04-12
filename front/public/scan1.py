import qrcode

# Create QR code instance
qr = qrcode.QRCode(
    version=1,  # Size of the QR code (1 = small, 40 = large)
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # Low error correction
    box_size=10,  # Size of each box in the QR grid
    border=4  # Border size
)

# Add data to QR code
qr.add_data("https://frimzy55.github.io/my_app/")
qr.make(fit=True)

# Create the QR code image with blue color
qr_img = qr.make_image(fill_color="blue", back_color="white")

# Show and save the image
qr_img.show()
qr_img.save("my_app_qr_blue.png")
