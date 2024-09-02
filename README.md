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

### Environment Variables
|Key|Default|Note|
|-|-|-|
|`HOST`|`0.0.0.0`| |
|`PORT`|`3000`| |
|`PARSE_PARAMS`|`ref`|Query parameters keys splitten by `,`|
|`REPORT_URL`|`undefined`||
