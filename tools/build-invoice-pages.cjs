'use strict';
// Keep the landing header/footer isolated; the tool build owns invoice logic.
const fs=require('fs'),path=require('path'),seo=require('./invoice-seo.cjs');
const root=path.resolve(__dirname,'..'),dist=path.resolve(process.argv[2]||path.join(root,'../cntaxtools-organizer/dist'));
const template=fs.readFileSync(path.join(root,'phan-loai-hoa-don/index.html'),'utf8');
const theme='<style>'+fs.readFileSync(path.join(__dirname,'invoice-site.css'),'utf8')+'</style>';
let header=template.slice(template.indexOf('<body')+template.slice(template.indexOf('<body')).indexOf('>')+1,template.indexOf('<main>')).trim()+'\n';
let footer=template.slice(template.indexOf('<footer class="sftr"'),template.lastIndexOf('</body>')).trim()+'\n';
const exe='https://github.com/Datkep92/HoaDonNhe/releases/download/v1.8.9/CN-Tax-Tools-v1.8.9.exe';
header=header.replace(/https:\/\/github.com\/Datkep92\/HoaDonNhe\/releases\/download\/[^" ]+\.exe/g,exe);
header=header.replace(/<a href="\.\.\/phan-loai-hoa-don\/"[^>]*>Phân loại hóa đơn<\/a>(?:\s*<a href="\.\.\/(?:tai-pdf|tai-hoa-don-goc)\/"[^>]*>[^<]+<\/a>)?/,'<a href="../phan-loai-hoa-don/">Phân loại hóa đơn</a>\n<a href="../tai-hoa-don-goc/">Tải hóa đơn gốc</a>');
for(const page of seo.pages){const {directory,mode,title,offline}=page;
 const out=path.join(root,directory);fs.mkdirSync(out,{recursive:true});
 let html=fs.readFileSync(path.join(dist,mode==='pdf'?'tai-pdf/index.html':'index.html'),'utf8');
 html=html.replace(/(<a id="tab-sort"[^>]*href=")[^"]+/, '$1../phan-loai-hoa-don/').replace(/(<a id="tab-pdf"[^>]*href=")[^"]+/,'$1../tai-hoa-don-goc/');
 html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+title+'</title>');
 const metadata=seo.head(page);
 const active=header.replace('href="../'+directory+'/"','href="../'+directory+'/" aria-current="page"');
 html=html.replace('</head>',theme+metadata+'</head>').replace(/<main([^>]*)>/,(_,attrs)=>active+'<main'+attrs+'>').replace('</main>',seo.content(page)+'</main>').replace('</body>',footer+'</body>');
 fs.writeFileSync(path.join(out,'index.html'),html.replace(/\r\n/g,'\n'));
 for(const name of ['CNTaxTools-PhanLoai.html','CNTaxTools-TaiPDF.html'])fs.copyFileSync(path.join(dist,name),path.join(out,name));
 for(const name of ['HUONG-DAN.md','THIRD_PARTY_NOTICES.md','SHA256SUMS.txt'])fs.copyFileSync(path.join(dist,name),path.join(out,name));
 console.log(directory+': '+title+'; offline '+offline);
}

const old=path.join(root,'tai-pdf/index.html');fs.mkdirSync(path.dirname(old),{recursive:true});fs.writeFileSync(old,'<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><link rel="canonical" href="'+seo.base+'tai-hoa-don-goc/"><meta http-equiv="refresh" content="0;url=../tai-hoa-don-goc/"><title>Tải hóa đơn gốc — chuyển trang</title></head><body><p><a href="../tai-hoa-don-goc/">Mở công cụ tải hóa đơn gốc</a></p><script>location.replace("../tai-hoa-don-goc/"+location.search+location.hash)</script></body></html>');

for(const name of ['CNTaxTools-PhanLoai.html','CNTaxTools-TaiPDF.html','HUONG-DAN.md','THIRD_PARTY_NOTICES.md','SHA256SUMS.txt'])fs.copyFileSync(path.join(dist,name),path.join(root,'tai-pdf',name));
