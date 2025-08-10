// functions to request, read, and handle data from the yubikey, written by joaquin :)

const scan = async () => {
    if ("NDEFReader" in window) {
        try {
            const nfc = new window.NDEFReader();
            await nfc.scan();

            nfc.onreadingerror = () => {
                console.log("couldn't read your yubikey, sorry :(");
            }

            nfc.onreading = (event) => {
                console.log("nfc tag read");
                return onReading(event);
            }
        } catch (error) {
            console.error(`oh no! this happened: ${error}`);
        }
    }
}

const onReading = ({message, serialNumber}) => {
    for (const record of message.records) {
        switch (record.recordType) {
            case "text":
                const decodedMessage = new TextDecoder(record.encoding).decode(record.data);
                console.log(`message: ${decodedMessage}`);
                return decodedMessage;
                break;
            case "url":
                const decodedLink = new TextDecoder(record.encoding).decode(record.data);
                const otpCode = decodedLink.slice(decodedLink.length - 45);
                console.log(`raw link: ${decodedLink}`);
                console.log(`OTP code: ${otpCode}`);
                return otpCode;
            default:
                console.error('uh oh, something weird happened reading the tag:');
                console.log('got the following data.');
                console.log(`encoding: ${record.encoding}\ntype: ${record.recordType}`);
        }
    }
}