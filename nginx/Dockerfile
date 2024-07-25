FROM nginx:1.22.1

# ベースイメージの設定ファイルを自前に置換
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
