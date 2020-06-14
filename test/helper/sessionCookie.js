'use strict;'

module.exports = {
  sessionCookie: (response) => {
    if (response.headers['set-cookie'] === undefined) {
      return 'no cookies set'
    }
    /*
    Tests fail intermittently due to a change in the minute in the expires value. Thus, the sids are shortened to 144 chars.
    Expected: "connect.sid=s%3AxEEiL7bDN6-k-W5CpC1AzbhPhPsDZJNC.%2Fm%2Bq48m6f7%2BtPeo2pfS4rFpFpMfrdSm%2Fv%2FprCdyjW%2F8; Path=/; Expires=Sun, 14 Jun 2020 18:02:54 GMT; HttpOnly"
    Received: "connect.sid=s%3AxEEiL7bDN6-k-W5CpC1AzbhPhPsDZJNC.%2Fm%2Bq48m6f7%2BtPeo2pfS4rFpFpMfrdSm%2Fv%2FprCdyjW%2F8; Path=/; Expires=Sun, 14 Jun 2020 18:02:55 GMT; HttpOnly"
    */
    return response.headers['set-cookie'].find((s) => s.startsWith('connect.sid')).substring(0, 144)
  }
}
