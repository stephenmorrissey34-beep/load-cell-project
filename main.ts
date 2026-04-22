/**
 * ===== Stability system =====
 */
let weightRounded = 0
let weight = 0
let raw = 0
// ===== Calibration (your original 100g–800g dataset) =====
let offset = 8957000
let scale = 430
// ===== LED pins (NEW SETUP) =====
let led100 = DigitalPin.P2
let led300 = DigitalPin.P15
let led500 = DigitalPin.P16
let threshold = 20
let stabilityRange = 2
let stableRequired = 5
// =====================
// HX711 setup
// =====================
HX711.SetPIN_DOUT(DigitalPin.P0)
HX711.SetPIN_SCK(DigitalPin.P8)
HX711.begin()
// =====================
// Serial setup
// =====================
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
serial.writeLine("=== HX711 Scale (P2/P15/P16) ===")
serial.writeLine("--------------------------------")
basic.pause(2000)
// =====================
// MAIN LOOP
// =====================
basic.forever(function () {
    raw = HX711.read_average(25)
    weight = (raw - offset) / scale
    weightRounded = Math.round(weight * 10) / 10
    // =====================
    // SERIAL OUTPUT
    // =====================
    serial.writeString("Weight: ")
    serial.writeNumber(weightRounded)
    serial.writeString(" g | Raw: ")
    serial.writeNumber(raw)
    serial.writeLine("")
    // =====================
    // DISPLAY
    // =====================
    basic.showNumber(Math.round(weight))
    // =====================
    // LED INDICATORS
    // =====================
    pins.digitalWritePin(DigitalPin.P0, weight >= 100 ? 1 : 0)
    pins.digitalWritePin(DigitalPin.P0, weight >= 300 ? 1 : 0)
    pins.digitalWritePin(DigitalPin.P0, weight >= 500 ? 1 : 0)
    if (false) {
    	
    } else {
    	
    }
})
