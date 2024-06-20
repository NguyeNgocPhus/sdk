# Cú pháp sdk
```python
  <script>
        (function (d, t) {
					var BASE_URL = "http://localhost:3000";
					var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
					g.src = BASE_URL + "/sdk.js";
					g.defer = true;
					g.async = true;
					s.parentNode.insertBefore(g, s);
					g.onload = function () {
						window.SDK.run({
							websiteToken: 'z5SH8mf7XSqA4N7CiHNHEi9X',
							baseUrl: BASE_URL
						})
                        console.log("ok")
					}
				})(document, "script");              
  </script> 
  ```