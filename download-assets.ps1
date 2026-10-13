$fontsDir = "public\fonts"
$lottieDir = "public\lottie"

New-Item -ItemType Directory -Force -Path $fontsDir
New-Item -ItemType Directory -Force -Path $lottieDir

$fonts = @{
    "HKGuiseRegular.woff2" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/681750107945aeb14e2db7e3_HKGuiseRegular.woff2"
    "HKGuiseSemiBold.woff2" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/681750101e7e0d62337af89e_HKGuiseSemiBold.woff2"
    "HKGuiseBold.woff2" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/68175010e3a672f015eb37dc_HKGuiseBold.woff2"
    "CHANEY-Wide.woff2" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/681750100f7f885d41af0923_CHANEY-Wide.woff2"
    "Humane-Medium.woff2" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/68175010b2a38845767732fa_Humane-Medium.woff2"
}

$lotties = @{
    "digital.json" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67fafc161746ed16333e8045_digital.json"
    "designer.json" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67ffa6b8e7add41db7b12a80_Designer.json"
    "globe.json" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67bbbd8ade2275798af595f6_63473c637f3d3f5530d4c44c_lf30_editor_meaiixa3.json"
    "countdown.json" = "https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67f7d097b9714c592a74c3a9_Countdown_-Bold.json"
}

foreach ($font in $fonts.GetEnumerator()) {
    Invoke-WebRequest -Uri $font.Value -OutFile "$fontsDir\$($font.Key)"
}

foreach ($lottie in $lotties.GetEnumerator()) {
    Invoke-WebRequest -Uri $lottie.Value -OutFile "$lottieDir\$($lottie.Key)"
}
