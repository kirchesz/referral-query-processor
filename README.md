```
                                              x-referral-code: kirchesz
https://example.com/path?a=1&ref=kirchesz&b=3 ------------------------> https://example.com/path?a=1&b=3
                                              \
                                               .-------------------------------------.
                                               | {                                   |
                                               |   "code": "kirchesz",               |
                                               |   "fingerprint": "123.123.123.123"  |
                                               | }                                   |
                                               `-------------------------------------`
                                                \
                                                  -----------> https://{REPORT_URL}
```
