import * as deepmerge from 'deepmerge';

/** URLパラメータ操作ユーティリティ */
export default class QueryUtil {

    /** URLパラメータ */
    public params : any = {};

    /** URLハッシュ */
    public hashes : any = {};

    /** 区切り文字 */
    private delimiter : string | undefined = undefined;

    /** URLパラメータを取得 */
    public get(delimiter? : string) : QueryUtil {
        this.params = {};
        this.delimiter = delimiter;

        // URLパラメータを文字列で取得(?含む)
        let urlParamStr = window.location.search;

        if (urlParamStr) {
            // ?を除去
            urlParamStr = urlParamStr.substring(1);

            // urlパラメータをオブジェクトにまとめる
            urlParamStr.split('&').forEach( param => {
                let temp = param.split('=');

                // pramsオブジェクトにパラメータを追加
                this.params = {
                    ...this.params,
                    [temp[0]]: (this.delimiter)? temp[1].split(this.delimiter) : temp[1]
                };
            });
        }

        // URLハッシュを文字列で取得
        let urlHashStr = window.location.hash;

        if(urlHashStr) {
            // 先頭の#を除去
            urlHashStr = urlHashStr.substring(1);

            // URLハッシュをオブジェクトにまとめる
            urlHashStr.split('#').forEach(hash => {
                let temp = hash.split('=');

                // pramsオブジェクトにパラメータを追加
                this.hashes = {
                    ...this.hashes,
                    [temp[0]]: (this.delimiter)? temp[1].split(this.delimiter) : temp[1]
                };
            });
        }

        // 自身のインスタンスを返却
        return this;
    }

    /** URLパラメータに値を追加 */
    public addParams(params : {}) : QueryUtil {

        if(params)
        {
            if(!this.params) this.params = {};
            this.params = deepmerge.all([this.params, params]);
        }

        /** 自身のインスタンスを返却 */
        return this;
    }
    
    /** URLハッシュに値を追加 */
    public addHashes(hashes : {}) : QueryUtil {

        if(hashes)
        {
            if(!this.hashes) this.hashes = {};
            this.hashes = deepmerge.all([this.hashes, hashes]);
        }

        /** 自身のインスタンスを返却 */
        return this;
    }

    /** URLパラメータから値を削除 */
    public removeParam(key : string, value : string) : QueryUtil {

        if(key && key.length > 0 && value && value.length > 0 && this.params[key]) {
            if(Array.isArray(this.params[key]))
            {
                let p : string[] = this.params[key];
                if(p)
                {
                    this.params[key] = p.filter(n => n != value);
                }
            }
            else
            {
                let p : string = this.params[key];
                if(p)
                {
                    this.params[key] = p.replace(value, '');
                }
            }
        }

        // 自身のインスタンスを返却
        return this;
    }

    /** URLハッシュから値を削除 */
    public removehash(key : string, value : string) : QueryUtil {

        if(key && key.length > 0 && value && value.length > 0 && this.hashes[key]) {
            if(Array.isArray(this.hashes[key]))
            {
                let p : string[] = this.hashes[key];
                if(p)
                {
                    this.hashes[key] = p.filter(n => n != value);
                }
            }
            else
            {
                let p : string = this.hashes[key];
                if(p)
                {
                    this.hashes[key] = p.replace(value, '');
                }
            }
        }

        // 自身のインスタンスを返却
        return this;
    }

    /** URLハッシュキーを削除 */
    public removehashKey(key : string) : QueryUtil {

        if(key && key.length > 0) {
            this.hashes = {};
        }

        // 自身のインスタンスを返却
        return this;
    }

    /** URLパラメータ部分のみを文字列化 */
    public toString(keys : string[]) : string {
        let ret : string = '';

        if(keys) {
            let temp : string[] = [];
            keys.forEach((key)=> {
                let val = this.params[key];
                if(val && val.length > 0)
                {
                    temp.push(`${key}=${(Array.isArray(val)? Array.from(new Set(val)).join(this.delimiter) : val)}`);
                }
            });
            ret = temp.join('&');
        }

        return (ret.length > 0)? `?${ret}` : '';
    }

    /** URLパラメータとURLハッシュを含めてURL文字列を生成 */
    public createFullUrl() : string {
        let ret : string  = `${window.location.origin}${window.location.pathname}`;

        let pKeys = Object.keys(this.params);
        if(pKeys)
        {
            let temp : string[] = [];
            pKeys.forEach((pKey) => {
                let val = this.params[pKey];
                if(val && val.length > 0)
                {
                    temp.push(`${pKey}=${(Array.isArray(val)? Array.from(new Set(val)).join(this.delimiter) : val)}`);
                }
            });
            if(temp.length > 0)
            {
                ret = `${ret}?${temp.join('&')}`;
            }
        }

        let hKeys = Object.keys(this.hashes);
        if(hKeys)
        {
            let temp : string[] = [];
            hKeys.forEach((hKey) => {
                let val = this.hashes[hKey];
                temp.push(`${hKey}=${(Array.isArray(val)? Array.from(new Set(val)).join(this.delimiter) : val)}`);
            });
            if(temp.length > 0)
            {
                ret = `${ret}#${temp.join('#')}`;
            }
        }

        return ret;
    }
}