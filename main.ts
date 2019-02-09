/**
 * makecode PCF2129 RTC Package.
 */

/**
 * PCF2129 block
 */
//% weight=10 color=#0fbc11 icon="\uf017" block="PCF2129"
namespace PCF2129 {
    let I2C_ADDR = 0x51
    let REG_SECOND = 0x03
    let REG_MINUTE = 0x04
    let REG_HOUR = 0x05
    let REG_DAY = 0x06
    let REG_WEEKDAY = 0x07
    let REG_MONTH = 0x08
    let REG_YEAR = 0x09

    /**
     * set reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(I2C_ADDR, buf);
    }

    /**
     * get reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a BCD data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat & 0x0f);
    }

    /**
     * convert a Dec data to BCD
     */
    function DecToHex(dat: number): number {
        return Math.trunc(dat / 10) << 4 | (dat % 10)
    }

    /**
     * get Year
     */
    //% blockId="getYear" block="get year"
    //% weight=100 blockGap=8
    export function getYear(): number {
        return (HexToDec(getReg(REG_YEAR)))
    }

    /**
     * set year
     * @param dat data of year, eg: 2019
     */
    //% blockId="setYear" block="set year %dat"
    //% weight=99 blockGap=8
    export function setYear(dat: number): void {
        setReg(REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * get month
     */
    //% blockId="getmMonth" block="get month"
    //% weight=98 blockGap=8
    export function getMonth(): number {
        return HexToDec(getReg(REG_MONTH))
    }

    /**
     * set month
     * @param dat data of month, eg: 3
     */
    //% blockId="setMonth" block="set month %dat"
    //% weight=97 blockGap=8
    export function setMonth(dat: number): void {
        setReg(REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * get day
     */
    //% blockId="getDay" block="get day"
    //% weight=96 blockGap=8
    export function getDay(): number {
        return HexToDec(getReg(REG_DAY))
    }

    /**
     * set day
     * @param dat data of day, eg: 14
     */
    //% blockId="setDay" block="set day %dat"
    //% weight=95 blockGap=8
    export function setDay(dat: number): void {
        setReg(REG_DAY, DecToHex(dat % 32))
    }

    /**
     * get weekday
     */
    //% blockId="getWeekday" block="get weekday"
    //% weight=94 blockGap=8
    export function getWeekday(): number {
        return HexToDec(getReg(REG_WEEKDAY))
    }

    /**
     * set weekday
     * @param dat data of weekday, eg: 4
     */
    //% blockId="setWeekday" block="set weekday %dat"
    //% weight=93 blockGap=8
    export function setWeekday(dat: number): void {
        setReg(REG_WEEKDAY, DecToHex(dat % 7))
    }

    /**
     * get hour
     */
    //% blockId="getHour" block="get hour"
    //% weight=92 blockGap=8
    export function getHour(): number {
        return HexToDec(getReg(REG_HOUR))
    }

    /**
     * set hour
     * @param dat data of hour, eg: 5
     */
    //% blockId="setHour" block="set hour %dat"
    //% weight=91 blockGap=8
    export function setHour(dat: number): void {
        setReg(REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * get Minute
     */
    //% blockId="getMinute" block="get minute"
    //% weight=90 blockGap=8
    export function getMinute(): number {
        return HexToDec(getReg(REG_MINUTE))
    }

    /**
     * set minute
     * @param dat data of minute, eg: 30
     */
    //% blockId="setMinute" block="set minute %dat"
    //% weight=89 blockGap=8
    export function setMinute(dat: number): void {
        setReg(REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * get Second
     */
    //% blockId="getseconde" block="get second"
    //% weight=88 blockGap=8
    export function getSecond(): number {
        return HexToDec(getReg(REG_SECOND))
    }

    /**
     * set second
     * @param dat data of second, eg: 0
     */
    //% blockId="setSecond" block="set second %dat"
    //% weight=87 blockGap=8
    export function setSecond(dat: number): void {
        setReg(REG_SECOND, DecToHex(dat % 60))
    }

    /**
     * get osf
     */
    //% blockId="getOsf" block="get OSF"
    //% weight=86 blockGap=8
    export function getOsf(): boolean {
        return (getReg(REG_SECOND) & 0x80)==0 ? true:false
    }

    /**
     * reset osf
     */
    //% blockId="resetOsf" block="reset OSF"
    //% weight=85 blockGap=8
    export function resetOsf(): void {
        setReg(REG_SECOND, getReg(REG_SECOND) & 0x7f)
    }

    /**
     * set Date and Time
     * @param year data of year, eg: 2019
     * @param month data of month, eg: 3
     * @param day data of day, eg: 14
     * @param weekday data of weekday, eg: 4
     * @param hour data of hour, eg: 5
     * @param minute data of minute, eg: 30
     * @param second data of second, eg: 0
     */
    //% blockId="setSecond" block="set second %dat"
    //% weight=70 blockGap=8
    //% blockId="setDateTime" block="set year %year|month %month|day %day|weekday %weekday|hour %hour|minute %minute|second %second"
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = REG_SECOND;
        buf[1] = DecToHex(second);
        buf[2] = DecToHex(minute);
        buf[3] = DecToHex(hour);
        buf[4] = DecToHex(day);
        buf[5] = DecToHex(weekday);
        buf[6] = DecToHex(month);
        buf[7] = DecToHex(year);
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

}
