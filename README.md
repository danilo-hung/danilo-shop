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

