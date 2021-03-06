import React, { useState } from 'react';
import { DownloadIcon, LinkIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Center, Grid, GridItem, Text, IconButton, Tooltip } from '@chakra-ui/react';
import QRcode from 'qrcode.react';

const GenerateQr: React.FC = () => {
    const [qrData, setQrData] = useState<string>('');

    const downloadQR = () => {
        const qrCanvasElement: HTMLCanvasElement | null = document.querySelector('canvas');
        if (qrCanvasElement == null) return;
        const url = qrCanvasElement.toDataURL('imgae/png').replace('image/png', 'image/octet-stream');

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'NEOQR.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Grid h="200px" gap={4} m={4}>
            <GridItem colSpan={4}>
                <Text fontSize="4xl" textAlign="center">Generate A QrCode</Text>
                <InputGroup textAlign="center">
                    <InputLeftElement pointerEvents="none">
                        <LinkIcon color="blue.600" />
                    </InputLeftElement>
                    <Input
                        placeholder="Type a link or something to generate the QR code😉"
                        value={qrData}
                        onChange={(e) => setQrData(e.target.value)}
                    />
                </InputGroup>
            </GridItem>

            {
                qrData && (
                    <GridItem colSpan={4}>
                        <Center display="grid" gridGap="2">
                            <QRcode
                                value={qrData}
                                size={400}
                                includeMargin
                                bgColor="#000"
                                fgColor="#fff"
                            />

                            <Tooltip hasArrow label="Download QR code" bg="tomato">
                                <IconButton
                                    colorScheme="blackAlpha"
                                    background="tomato"
                                    color="white"
                                    aria-label="Download QR code"
                                    icon={<DownloadIcon />}
                                    onClick={downloadQR}
                                />
                            </Tooltip>
                        </Center>
                    </GridItem>
                )
            }
        </Grid>
    );
};

export default GenerateQr;
