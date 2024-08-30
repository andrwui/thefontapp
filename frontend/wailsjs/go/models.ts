export namespace main {
	
	export class FontVariant {
	    name: string;
	    path: string;
	    readonly: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FontVariant(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.readonly = source["readonly"];
	    }
	}
	export class FontFamily {
	    name: string;
	    variants: FontVariant[];
	    availableWeights: number[];
	    availableItalicWeights: number[];
	    hasReadonly: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FontFamily(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.variants = this.convertValues(source["variants"], FontVariant);
	        this.availableWeights = source["availableWeights"];
	        this.availableItalicWeights = source["availableItalicWeights"];
	        this.hasReadonly = source["hasReadonly"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

