import { useMemberStore } from "@/store/member";

const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net";

interface ApiRes {
  code: string;
  msg: string;
  result: any;
}

// 添加请求拦截器
uni.addInterceptor("request", {
  invoke(args: UniApp.RequestOptions) {
    // 如果不是 http 开头，才进行 URL 拼接
    if (!(args.url as string).startsWith("http")) {
      // 拼接请求基地址
      args.url = baseURL + args.url;
    }

    // 小程序端调用，请求头中 header 中添加：'source-client': 'miniapp'
    args.header = {
      ...args.header,
      "source-client": "miniapp",
    };
    // 携带token
    const memberStore = useMemberStore();
    const token = memberStore.profile.token;
    if (token) {
      args.header.Authorization = token;
    }
  },
});

// 拦截上传文件的请求
uni.addInterceptor("uploadFile", {
  invoke(args: UniApp.RequestOptions) {
    // 如果不是 http 开头，才进行 URL 拼接
    if (!(args.url as string).startsWith("http")) {
      // 拼接请求基地址
      args.url = baseURL + args.url;
    }

    // 小程序端调用，请求头中 header 中添加：'source-client': 'miniapp'
    args.header = {
      ...args.header,
      "source-client": "miniapp",
    };
    // 携带token
    const memberStore = useMemberStore();
    const token = memberStore.profile.token;
    if (token) {
      args.header.Authorization = token;
    }
  },
});

// 封装请求方法
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回 Promise 对象
  // Promise 的泛型用于确定 resolve 的回调结果类型
  return new Promise<T>((resolve, reject) => {
    uni.request({
      // 参数应用
      ...options,
      // 成功
      success(res) {
        resolve((res.data as ApiRes).result);
      },
      // 失败
      fail(err) {
        reject(err);
      },
    });
  });
};
