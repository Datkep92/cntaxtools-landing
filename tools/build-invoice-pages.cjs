'use strict';
// Keep the landing header/footer isolated; the tool build owns invoice logic.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),dist=path.resolve(process.argv[2]||path.join(root,'../cntaxtools-organizer/dist'));
const template=fs.readFileSync(path.join(root,'phan-loai-hoa-don/index.html'),'utf8');
const theme='<style>'+fs.readFileSync(path.join(__dirname,'invoice-site.css'),'utf8')+'</style>';
let header=template.slice(template.indexOf('<body')+template.slice(template.indexOf('<body')).indexOf('>')+1,template.indexOf('<main>'));
let footer=template.slice(template.indexOf('<footer class="sftr"'),template.lastIndexOf('</body>'));
const exe='https://github.com/Datkep92/HoaDonNhe/releases/download/v1.8.9/CN-Tax-Tools-v1.8.9.exe';
header=header.replace(/https:\/\/github.com\/Datkep92\/HoaDonNhe\/releases\/download\/[^" ]+\.exe/g,exe);
header=header.replace(/<a href="\.\.\/phan-loai-hoa-don\/"[^>]*>Phân loại hóa đơn<\/a>(?:\s*<a href="\.\.\/tai-pdf\/"[^>]*>Tải PDF gốc<\/a>)?/,'<a href="../phan-loai-hoa-don/">Phân loại hóa đơn</a>\n<a href="../tai-pdf/">Tải PDF gốc</a>');
for(const [directory,mode,title,offline] of [['phan-loai-hoa-don','sort','Phân loại hóa đơn XML / ZIP','CNTaxTools-PhanLoai.html'],['tai-pdf','pdf','Tải PDF hóa đơn gốc','CNTaxTools-TaiPDF.html']]){
 const out=path.join(root,directory);fs.mkdirSync(out,{recursive:true});
 let html=fs.readFileSync(path.join(dist,mode==='pdf'?'tai-pdf/index.html':'index.html'),'utf8');
 html=html.replace(/href="(?:\.\/|\.\.\/)" aria-pressed="true"/,'href="../phan-loai-hoa-don/" aria-pressed="true"').replace(/href="(?:tai-pdf\/|\.\/)" aria-pressed="false"/,'href="../tai-pdf/" aria-pressed="false"');
 const metadata='<meta name="description" content="'+(mode==='pdf'?'Chọn thư mục XML hoặc nhiều tệp XML, chọn nơi lưu và tải PDF gốc trực tiếp.':'Phân loại XML và ZIP theo MST mua vào, bán ra trên thiết bị, giữ nguyên nguồn.')+'"><link rel="canonical" href="https://datkep92.github.io/cntaxtools-landing/'+directory+'/">';
 const active=header.replace('href="../'+directory+'/"','href="../'+directory+'/" aria-current="page"');
 html=html.replace('</head>',theme+metadata+'</head>').replace('<main>',active+'<main>').replace('</body>',footer+'</body>');
 fs.writeFileSync(path.join(out,'index.html'),html);
 for(const name of ['CNTaxTools-PhanLoai.html','CNTaxTools-TaiPDF.html'])fs.copyFileSync(path.join(dist,name),path.join(out,name));
 for(const name of ['HUONG-DAN.md','THIRD_PARTY_NOTICES.md','SHA256SUMS.txt'])fs.copyFileSync(path.join(dist,name),path.join(out,name));
 console.log(directory+': '+title+'; offline '+offline);
}
