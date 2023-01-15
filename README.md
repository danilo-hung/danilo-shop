# 使用 Netlify 發布網站
1. 前往Netlify網站 https://app.netlify.com/
2. 登入後，前往 "Site" card (發布網站，會查看已發布的網站)
3. 選擇 "Import an existing project from a Git repository" (設定將github repo的專案發布到網站)
4. 選擇 "Connect to Git provider" 並選擇 GitHub
5. 選擇要發布的repo (ex : danilo-hung/Danilo-shop)
   >如果沒有選項的話，選擇Configure the Netlify app on GitHub.設定Netlify可以Access的Repo <br>
   >也可以讓Netlify Access 所有的 Repo

## 選完後會進入Site settings
+ Owner (所有人) : danilo (通常是使用者)
+ Branch to deploy : dplyNetlift (選擇要發布的github 分支)
+ Base directoy : 空白
+ Build command : CI = npm run build
+ publish directory : build

## 授權Google FireBase Authentication 
專案中使用的Google登入，需要Fire base授權網域才能使用 <br>
firebase >> go to console >> Authentication >> settings >> 授權網域 (Authorize domain) <br>
將netlify發布完的網站網址新增到授權網域上

## 新增Redirect
因為本專案屬於Single Page Web, 因此在已發布的網站上，如果嘗試導向"/"以外的url，Netlify server會無法判讀要給予什麼get request而回傳error <br>
為了解決這個問題，需在專案中的public新增檔案"_redirects"讓netlify server判讀url<br>
1. in public/_redirects
```
/* /index.html 200
```
代表當嘗試direct到 "/anyotherpath",一律回傳 /index.html