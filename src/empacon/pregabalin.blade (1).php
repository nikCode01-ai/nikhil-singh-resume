<?php
 $title = "Empacon";
 $description = "Empacon is a specialized pharmaceutical formulation designed for targeted therapeutic management, available in multiple dosage forms and strengths.";
 $forms = ["Tablet", "Capsule", "Injection"];
 $strengths = ["50 mg", "100 mg", "200 mg"];
 $combos = ["Vitamin B Complex", "Omega-3", "Lycopene", "Coenzyme Q10"];
 $reviewer = "Dr. Anjali Sharma, MBBS, MD (Internal Medicine)";
 $updated = "Last updated December 2024";

 $quick_facts = [
     ['icon' => 'fas fa-info-circle', 'title' => 'What is it?', 'description' => 'Empacon is a comprehensive therapeutic agent for metabolic and cardiovascular support.'],
     ['icon' => 'certificate', 'title' => 'Compliance & Docs', 'description' => 'FDA Approved | ISO Certified | GMP Compliant'],
     ['icon' => 'fas fa-boxes', 'title' => 'Available with Agrosaf', 'description' => 'Tablet, Capsule, Injection in strengths: 50 mg, 100 mg, 200 mg'],
     ['icon' => 'fas fa-shipping-fast', 'title' => 'Dispatch', 'description' => 'Express dispatch within 24 hours for confirmed orders'],
     ['icon' => 'fas fa-box-open', 'title' => 'Common Packs', 'description' => '10×10 blister packs; 30 tablets/bottle; ampoules for injections']
 ];

 if (!function_exists('asset')) {
     function asset($path) {
         return $path;
     }
 }

 $uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';
 $uploadUrlBase = 'uploads/';
 $uploadErrors = [];
 $uploadSuccess = [];

 $allowedMimes = [
     'image/jpeg' => 'jpg',
     'image/png' => 'png',
     'image/gif' => 'gif',
     'image/webp' => 'webp',
 ];
 $maxBytes = 5 * 1024 * 1024;

 if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && isset($_FILES['photos'])) {
     if (!is_dir($uploadDir)) {
         @mkdir($uploadDir, 0755, true);
     }

     $finfo = function_exists('finfo_open') ? @finfo_open(FILEINFO_MIME_TYPE) : null;
     $names = $_FILES['photos']['name'] ?? [];
     $tmpNames = $_FILES['photos']['tmp_name'] ?? [];
     $errors = $_FILES['photos']['error'] ?? [];
     $sizes = $_FILES['photos']['size'] ?? [];

     $count = is_array($names) ? count($names) : 0;
     for ($i = 0; $i < $count; $i++) {
         $err = $errors[$i] ?? UPLOAD_ERR_NO_FILE;
         if ($err === UPLOAD_ERR_NO_FILE) {
             continue;
         }
         if ($err !== UPLOAD_ERR_OK) {
             $uploadErrors[] = 'Upload failed for a file (error code: ' . (int)$err . ').';
             continue;
         }

         $tmp = $tmpNames[$i] ?? '';
         $originalName = (string)($names[$i] ?? 'photo');
         $size = (int)($sizes[$i] ?? 0);

         if ($size <= 0 || $size > $maxBytes) {
             $uploadErrors[] = 'File "' . htmlspecialchars($originalName, ENT_QUOTES) . '" must be <= 5MB.';
             continue;
         }

         $mime = $finfo && is_string($tmp) && $tmp !== '' ? @finfo_file($finfo, $tmp) : '';
         $ext = $allowedMimes[$mime] ?? '';
         if ($ext === '') {
             $fallbackExt = strtolower((string)pathinfo($originalName, PATHINFO_EXTENSION));
             if (in_array($fallbackExt, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true)) {
                 $ext = $fallbackExt === 'jpeg' ? 'jpg' : $fallbackExt;
             }
         }
         if ($ext === '') {
             $uploadErrors[] = 'File "' . htmlspecialchars($originalName, ENT_QUOTES) . '" is not a supported image type.';
             continue;
         }

         $base = (string)pathinfo($originalName, PATHINFO_FILENAME);
         $base = preg_replace('/[^a-zA-Z0-9._-]+/', '_', $base);
         $base = trim((string)$base, '._-');
         if ($base === '') {
             $base = 'photo';
         }
         if (strlen($base) > 60) {
             $base = substr($base, 0, 60);
         }

         $name = $base . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
         $targetPath = $uploadDir . DIRECTORY_SEPARATOR . $name;

         if (!@move_uploaded_file($tmp, $targetPath)) {
             $uploadErrors[] = 'Could not save file "' . htmlspecialchars($originalName, ENT_QUOTES) . '".';
             continue;
         }
         $uploadSuccess[] = $uploadUrlBase . rawurlencode($name);
     }

     if ($finfo) {
         @finfo_close($finfo);
     }

     if (empty($uploadErrors) && !empty($uploadSuccess)) {
         $baseUrl = strtok((string)($_SERVER['REQUEST_URI'] ?? ''), '?');
         header('Location: ' . $baseUrl . '?uploaded=1');
         exit;
     }
 }

 $existingPhotos = [];
 $uploadedPhotos = [];
 $imgRegex = '/\.(jpe?g|png|gif|webp)$/i';

 $dirFiles = @scandir(__DIR__);
 if (is_array($dirFiles)) {
     foreach ($dirFiles as $file) {
         if ($file === '.' || $file === '..' || $file === 'uploads') {
             continue;
         }
         $full = __DIR__ . DIRECTORY_SEPARATOR . $file;
         if (is_file($full) && preg_match($imgRegex, $file)) {
             $existingPhotos[] = rawurlencode($file);
         }
     }
 }

 if (is_dir($uploadDir)) {
     $uploadFiles = @scandir($uploadDir);
     if (is_array($uploadFiles)) {
         foreach ($uploadFiles as $file) {
             if ($file === '.' || $file === '..') {
                 continue;
             }
             $full = $uploadDir . DIRECTORY_SEPARATOR . $file;
             if (is_file($full) && preg_match($imgRegex, $file)) {
                 $uploadedPhotos[] = $uploadUrlBase . rawurlencode($file);
             }
         }
     }
 }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo htmlspecialchars($title); ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
         /* Base Styles */
         * { box-sizing: border-box; }
        :root { --agro-header-height: 220px; }
        body { font-family: 'Inter', Arial, sans-serif; background: #f7f9fb; margin: 0; }
        .pregabalin-page { padding: calc(var(--agro-header-height) + 20px) 0 40px; display: flex; flex-direction: column; align-items: center; }
        .pregabalin-page .container { display: flex; justify-content: center; max-width: 1400px; width: 100%; padding: 0 40px; gap: 60px; margin: 0 auto; }
         
         /* Left Section */
         .left { max-width: 60%; flex: 1; }
         h1 { font-size: 40px; margin: 0 0 10px; font-weight: 750; color: #1f2d3d; }
         .description { font-size: 17px; color: #4a5568; margin-bottom: 25px; line-height: 1.5; }
         .pregabalin-page .row { display: flex; align-items: center; margin-bottom: 18px; }
         .section-label { font-weight: 600; margin-right: 12px; color: #7f8185; font-size: 15px; min-width: 90px; }
         .tag { display: inline-block; padding: 6px 15px; border-radius: 20px; margin-right: 6px; font-size: 14px; }
         .tag { background: #e1efff; color: #1e75d8; }
         .tag-green { background: #e4fbe4; color: #11a711; }
         .tag-purple { background: #f3ecff; color: #8d839c; }
        .pregabalin-page .footer { margin-top: 20px; font-size: 14px; color: #222429; }
         
         /* Right Image */
         .right-image-box { 
            width: 280px; height: 280px; background: #fff; border-radius: 16px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; align-items: center; 
            justify-content: center; margin-top: 40px; flex-shrink: 0; 
         }
         .right-image-box img { width: 70%; }
         
         /* Quick Facts */
         .quick-card { 
            background: #fff; border-radius: 16px; padding: 35px 40px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.06); max-width: 800px; 
            width: 100%; margin: 60px auto; 
         }
         .quick-title { font-size: 22px; font-weight: 700; margin-bottom: 25px; }
         .quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 25px; }
         .quick-item { display: flex; gap: 12px; }
         .quick-icon { 
            width: 45px; height: 45px; background: #e8f5f9; border-radius: 12px; 
            display: flex; justify-content: center; align-items: center; 
         }
         .quick-icon i { font-size: 20px; color: #176b72; }
         .quick-head { font-size: 15px; font-weight: 600; color: #1f2d3d; margin: 0; }
         .quick-text { font-size: 14px; color: #4b5563; line-height: 1.4; margin: 5px 0 0; }
         .divider { height: 1px; background: #e5e7eb; margin: 25px 0; }
        .pregabalin-page .btn-row { display: flex; gap: 15px; }
        .pregabalin-page .btn-primary, .pregabalin-page .btn-green { 
             padding: 12px 22px; border-radius: 25px; font-size: 15px; 
             border: none; cursor: pointer; color: white; 
         }
        .pregabalin-page .btn-primary { background: #176b72; }
        .pregabalin-page .btn-green { background: #34c759; }

         @media (max-width: 992px) {
            .pregabalin-page { padding: calc(var(--agro-header-height) + 24px) 0 24px; }
            .pregabalin-page .container { padding: 0 24px; gap: 30px; flex-direction: column; }
             .left { max-width: 100%; }
             .right-image-box { margin: 0 auto; }
             .quick-card { margin: 40px auto; padding: 28px 24px; }
             .quick-grid { grid-template-columns: repeat(2, 1fr); }
         }

         @media (max-width: 768px) {
            .pregabalin-page { padding: calc(var(--agro-header-height) + 18px) 0 18px; }
            .pregabalin-page .container { padding: 0 16px; }
             h1 { font-size: 32px; }
             .description { font-size: 16px; }
            .pregabalin-page .row { flex-wrap: wrap; gap: 10px; }
             .section-label { min-width: auto; margin-right: 0; }
             .right-image-box { width: 220px; height: 220px; margin-top: 10px; }
             .right-image-box img { width: 72%; }
             .quick-grid { grid-template-columns: 1fr; }
            .pregabalin-page .btn-row { flex-direction: column; }
            .pregabalin-page .btn-primary, .pregabalin-page .btn-green { width: 100%; text-align: center; justify-content: center; }
         }

         @media (max-width: 480px) {
            h1 { font-size: 26px; }
            .tag { font-size: 13px; padding: 6px 12px; }
            .quick-card { padding: 22px 16px; }
        }
    </style>
</head>

<body>
    <header class="header" style="position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e7eb;">
        <div style="max-width: 1400px; margin: 0 auto; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between;">
            <div style="font-weight: 800; color: #176b72; font-size: 18px;">Empacon</div>
            <div style="font-size: 14px; color: #4b5563;">Product Information</div>
        </div>
    </header>
    <div class="pregabalin-page">
        <div class="container">
            <div class="left">
                <h1><?php echo htmlspecialchars($title); ?></h1>
                <p class="description"><?php echo $description; ?></p>

                <div class="row">
                    <span class="section-label">Forms:</span>
                    <?php foreach ($forms as $f): ?> <span class="tag"><?php echo htmlspecialchars($f); ?></span> <?php endforeach; ?>
                </div>

                <div class="row">
                    <span class="section-label">Strengths:</span>
                    <?php foreach ($strengths as $s): ?> <span class="tag tag-green"><?php echo htmlspecialchars($s); ?></span> <?php endforeach; ?>
                </div>

                <div class="row">
                    <span class="section-label">Combos:</span>
                    <?php foreach ($combos as $c): ?> <span class="tag tag-purple">+ <?php echo htmlspecialchars($c); ?></span> <?php endforeach; ?>
                </div>

                <div class="footer">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-user-md" style="color: #176b72;"></i>
                        <span>Reviewed by <strong><?php echo htmlspecialchars($reviewer); ?></strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="far fa-calendar-alt" style="color: #176b72;"></i>
                        <span><?php echo htmlspecialchars($updated); ?></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="quick-card">
            <div class="quick-title">Quick Facts</div>
            <div class="quick-grid">
                <?php foreach ($quick_facts as $fact): ?>
                <div class="quick-item">
                    <div class="quick-icon" style="font-size: 20px; color: #176b72; min-height: 24px; min-width: 24px; display: flex; align-items: center; justify-content: center;">
                        <?php if (($fact['icon'] ?? '') === 'certificate'): ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#176b72">
                                <path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v21c0 0.15 0.037 0.3 0.1 0.437 0.2 0.4 0.6 0.563 1.037 0.563 0.175 0 0.338-0.038 0.5-0.1l6.862-3.2 6.9 3.2c0.15 0.075 0.325 0.1 0.5 0.1 0.438 0 0.838-0.2 1.038-0.563 0.062-0.137 0.1-0.287 0.1-0.437v-21c0-0.825-0.675-1.5-1.5-1.5h-0.5v10.5c0 0.2-0.1 0.4-0.3 0.5s-0.4 0.1-0.6 0l-2.2-1.8-2.2 1.8c-0.1 0.1-0.2 0.1-0.3 0.1s-0.2 0-0.3-0.1l-2.2-1.8-2.2 1.8c-0.1 0.1-0.3 0.1-0.4 0.1s-0.3-0.1-0.4-0.2c-0.2-0.1-0.3-0.3-0.3-0.5v-10.5h-1.5v19.2l5.4-2.5c0.2-0.1 0.4-0.1 0.6 0l5.4 2.5v-18.7h-2.5v-1.5h3c0.3 0 0.5 0.2 0.5 0.5v20.2l-6.4-3c-0.2-0.1-0.4-0.1-0.6 0l-6.4 3v-20.2c0-0.3 0.2-0.5 0.5-0.5z"></path>
                            </svg>
                        <?php else: ?>
                            <i class="<?php echo htmlspecialchars((string)($fact['icon'] ?? '')); ?>"></i>
                        <?php endif; ?>
                    </div>
                    <div>
                        <div class="quick-head"><?php echo htmlspecialchars((string)($fact['title'] ?? '')); ?></div>
                        <div class="quick-text"><?php echo htmlspecialchars((string)($fact['description'] ?? '')); ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <div class="divider"></div>
            <div class="btn-row">
                <a href="#contact-form" class="btn-primary" style="text-decoration: none; color: white; display: inline-flex; align-items: center; justify-content: center;">
                    <i class="fas fa-tag" style="margin-right: 8px;"></i> Get Distributor Pricing
                </a>
                <a href="https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20Empacon%20products" class="btn-green" style="text-decoration: none; color: white; display: inline-flex; align-items: center; justify-content: center;" target="_blank">
                    <i class="fab fa-whatsapp" style="margin-right: 8px;"></i> WhatsApp Sales
                </a>
            </div>
        </div>

        <div class="quick-card" style="margin-top: 0;">
            <div class="quick-title">Upload Photos</div>

            <?php if (!empty($uploadErrors)): ?>
                <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 12px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4;">
                    <?php foreach ($uploadErrors as $err): ?>
                        <div><?php echo $err; ?></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($_GET['uploaded'])): ?>
                <div style="background: #ecfdf5; border: 1px solid #bbf7d0; color: #166534; padding: 12px 14px; border-radius: 12px; font-size: 14px; margin-bottom: 12px;">
                    Photos uploaded successfully.
                </div>
            <?php endif; ?>

            <form method="post" enctype="multipart/form-data" style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                <input type="file" name="photos[]" accept="image/*" multiple style="padding: 10px 12px; border-radius: 12px; border: 1px solid #d1d5db; background: #ffffff;" />
                <button type="submit" style="background: #176b72; color: white; padding: 12px 22px; border-radius: 25px; font-size: 15px; border: none; cursor: pointer;">Upload</button>
            </form>

            <?php if (!empty($existingPhotos) || !empty($uploadedPhotos)): ?>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 16px;">
                    <?php foreach (array_merge($uploadedPhotos, $existingPhotos) as $photo): ?>
                        <div style="background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                            <img src="<?php echo htmlspecialchars($photo); ?>" alt="Photo" style="width: 100%; height: 140px; object-fit: cover; display: block;" />
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

<?php
// Single-salt data
$singleSaltRows = [
    ["50 mg", "Tablet", "Blister", "10×10", "30049099"],
    ["100 mg", "Tablet", "Blister", "10×10", "30049099"],
    ["200 mg", "Tablet", "Blister", "10×10", "30049099"],
    ["50 mg", "Capsule", "Blister", "10×10", "30049099"],
    ["100 mg", "Capsule", "Blister", "10×10", "30049099"],
    ["200 mg", "Capsule", "Blister", "10×10", "30049099"],
    ["50 mg", "Injection", "Ampoule", "10×1", "30049099"],
    ["100 mg", "Injection", "Ampoule", "10×1", "30049099"],
    ["200 mg", "Injection", "Ampoule", "10×1", "30049099"],
];

// Combinations data
$combinationRows = [
    ["75 mg + 10 mg", "Capsule", "Blister", "10×10", "30049099"],
    ["150 mg + 10 mg", "Capsule", "Blister", "10×10", "30049099"],
    ["75 mg + 500 mg", "Tablet", "Blister", "10×10", "30049099"],
    ["150 mg + 500 mg", "Tablet", "Blister", "10×10", "30049099"],
];
?>

<!-- ... existing HTML before the Forms & Strengths section ... -->

<!-- FORMS & STRENGTHS SECTION -->
<style>
.forms-strengths-section{max-width: 900px; width: 100%; padding: 20px 40px; margin-top: 40px; font-family: 'Inter', Arial, sans-serif;}
.forms-strengths-controls{display:flex; align-items:center; gap: 15px; margin-bottom: 20px;}
.fs-list{display:flex; flex-direction:column; gap:14px;}
.fs-card{background:#ffffff; border-radius:16px; padding:16px; box-shadow:0 3px 20px rgba(0,0,0,0.06); border:1px solid #eef2f7;}
.fs-card-top{display:flex; align-items:flex-start; justify-content:space-between; gap:12px;}
.fs-card-strength{font-size:16px; font-weight:800; color:#1f2d3d; line-height:1.2;}
.fs-card-form{margin-top:4px; font-size:13px; color:#64748b;}
.fs-card-skus{display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#176b72; text-decoration:none; white-space:nowrap;}
.fs-card-meta{margin-top:12px; display:flex; gap:16px; flex-wrap:wrap;}
.fs-card-meta-item{font-size:13px; color:#64748b;}
.fs-card-meta-item strong{color:#1f2d3d; font-weight:700;}
@media (max-width: 768px){
    .forms-strengths-section{padding: 18px 16px !important;}
    .forms-strengths-controls{flex-direction:column; align-items:stretch;}
    .forms-strengths-controls .tab-button{width: 100%; text-align:center;}
    #searchInput{width: 100%;}
    #tableContainer > div{overflow-x: visible !important;}
}
</style>
<div class="forms-strengths-section">

    <h2 style="font-size: 26px; font-weight: 700; margin-bottom: 20px;">Forms & Strengths</h2>

    <!-- TABS + SEARCH ROW -->
    <div class="forms-strengths-controls">

        <!-- TAB 1 -->
        <div id="singleSaltTab" 
             class="tab-button active" 
             data-tab="single-salt"
             style="background: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; color: #176b72; box-shadow: 0 2px 6px rgba(0,0,0,0.08); cursor: pointer;">
            Single-salt <span class="tab-count">(<?php echo count($singleSaltRows); ?>)</span>
        </div>

        <!-- TAB 2 -->
        <div id="combinationsTab" 
             class="tab-button" 
             data-tab="combinations"
             style="background: #f1f1f3; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; color: #4b5563; cursor: pointer;">
            Combinations <span class="tab-count">(<?php echo count($combinationRows); ?>)</span>
        </div>

        <!-- SEARCH BAR -->
        <input 
            type="text" 
            id="searchInput"
            placeholder="Search strength or form..." 
            style="flex: 1; padding: 10px 18px; border-radius: 12px; border: 1px solid #d1d5db; font-size: 15px; background: #ffffff;">
    </div>

    <!-- TABLE CONTAINER -->
    <div id="tableContainer">
        <!-- Table will be populated by JavaScript -->
    </div>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const singleSaltData = <?php echo json_encode($singleSaltRows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
    const combinationData = <?php echo json_encode($combinationRows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
    let currentTab = 'single-salt';
    let lastRenderedData = [];
    
    // Initialize the table with single-salt data
    renderTable(singleSaltData);
    
    // Tab click handlers
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab styling
            document.querySelectorAll('.tab-button').forEach(t => {
                t.style.background = '#f1f1f3';
                t.style.boxShadow = 'none';
                t.style.color = '#4b5563';
            });
            this.style.background = '#ffffff';
            this.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
            this.style.color = '#176b72';
            
            // Update current tab
            currentTab = this.dataset.tab;
            
            // Render appropriate data
            const data = currentTab === 'single-salt' ? singleSaltData : combinationData;
            renderTable(data);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const data = currentTab === 'single-salt' ? singleSaltData : combinationData;
        const filteredData = data.filter(row => 
            row.some(cell => cell.toLowerCase().includes(searchTerm))
        );
        renderTable(filteredData);
    });
    
    // Function to render the table
    function renderTable(data) {
        lastRenderedData = data;
        const container = document.getElementById('tableContainer');
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (data.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 20px; color: #6b7280; background: #ffffff; border-radius: 20px; box-shadow: 0 3px 20px rgba(0,0,0,0.06);">No matching results found.</div>';
            return;
        }

        if (isMobile) {
            let listHTML = '<div class="fs-list">';
            data.forEach(row => {
                const strength = row[0] ?? '';
                const form = row[1] ?? '';
                const packType = row[2] ?? '';
                const packOut = row[3] ?? '';
                listHTML += `
                    <div class="fs-card">
                        <div class="fs-card-top">
                            <div>
                                <div class="fs-card-strength">${strength}</div>
                                <div class="fs-card-form">${form}</div>
                            </div>
                            <a href="#" class="fs-card-skus">SKUs <i class="fas fa-chevron-right" style="font-size: 12px;"></i></a>
                        </div>
                        <div class="fs-card-meta">
                            <div class="fs-card-meta-item">Pack: <strong>${packType}</strong></div>
                            <div class="fs-card-meta-item">Pack-Out: <strong>${packOut}</strong></div>
                        </div>
                    </div>`;
            });
            listHTML += '</div>';
            container.innerHTML = listHTML;
            return;
        }
        
        let tableHTML = `
            <div style="background: #ffffff; border-radius: 20px; padding: 0; overflow: hidden; box-shadow: 0 3px 20px rgba(0,0,0,0.06); width: 100%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                    <thead>
                        <tr style="background: #ffffff; color: #6b7280; text-align: left;">
                            <th style="padding: 16px 20px;">Strength</th>
                            <th style="padding: 16px 20px;">Dosage Form</th>
                            <th style="padding: 16px 20px;">Pack Type</th>
                            <th style="padding: 16px 20px;">Pack-Out</th>
                            <th style="padding: 16px 20px;">HSN</th>
                            <th style="padding: 16px 20px;"></th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        data.forEach(row => {
            tableHTML += `
                <tr style="border-top: 1px solid #f1f1f1;">
                    <td style="padding: 16px 20px; font-weight: 700; color: #1f2d3d;">${row[0]}</td>
                    <td style="padding: 16px 20px;">${row[1]}</td>
                    <td style="padding: 16px 20px;">${row[2]}</td>
                    <td style="padding: 16px 20px;">${row[3]}</td>
                    <td style="padding: 16px 20px; color: #176b72; font-weight: 600;">${row[4]}</td>
                    <td style="padding: 16px 20px; text-align: right; padding-right: 25px;">
                        <a href="#" style="color: #176b72; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 5px;">View SKUs <i class="fas fa-arrow-right" style="font-size: 12px;"></i></a>
                    </td>
                </tr>`;
        });
        
        tableHTML += `</tbody></table></div>`;
        container.innerHTML = tableHTML;
    }

    window.addEventListener('resize', function() {
        const data = lastRenderedData.length ? lastRenderedData : (currentTab === 'single-salt' ? singleSaltData : combinationData);
        renderTable(data);
    });
});
</script>
<?php
$products = [
    [
        "name" => "EMPACON 50",
        "strength" => "50 mg",
        "form" => "Tablet",
        "pack" => "10×10 Tablets",
        "price" => "95.00",
        "image" => "images/empacon-50.png",
        "badges" => ["GMP", "CoA"]
    ],
    [
        "name" => "EMPACON 100",
        "strength" => "100 mg",
        "form" => "Tablet",
        "pack" => "10×10 Tablets",
        "price" => "165.00",
        "image" => "images/empacon-100.png",
        "badges" => ["GMP", "CoA", "Bestseller"]
    ],
    [
        "name" => "EMPACON 200",
        "strength" => "200 mg",
        "form" => "Tablet",
        "pack" => "10×10 Tablets",
        "price" => "245.00",
        "image" => "images/empacon-200.png",
        "badges" => ["GMP", "CoA"]
    ],
    [
        "name" => "EMPACON 50 CAP",
        "strength" => "50 mg",
        "form" => "Capsule",
        "pack" => "10×10 Capsules",
        "price" => "110.00",
        "image" => "images/empacon-50-cap.png",
        "badges" => ["GMP", "CoA"]
    ],
    [
        "name" => "EMPACON 100 CAP",
        "strength" => "100 mg",
        "form" => "Capsule",
        "pack" => "10×10 Capsules",
        "price" => "185.00",
        "image" => "images/empacon-100-cap.png",
        "badges" => ["GMP", "CoA", "Bestseller"]
    ],
    [
        "name" => "EMPACON 200 CAP",
        "strength" => "200 mg",
        "form" => "Capsule",
        "pack" => "10×10 Capsules",
        "price" => "275.00",
        "image" => "images/empacon-200-cap.png",
        "badges" => ["GMP", "CoA"]
    ],
    [
        "name" => "EMPACON 50 INJ",
        "strength" => "50 mg",
        "form" => "Injection",
        "pack" => "10×1 Ampoules",
        "price" => "130.00",
        "image" => "images/empacon-50-inj.png",
        "badges" => ["GMP", "CoA"]
    ],
    [
        "name" => "EMPACON 100 INJ",
        "strength" => "100 mg",
        "form" => "Injection",
        "pack" => "10×1 Ampoules",
        "price" => "220.00",
        "image" => "images/empacon-100-inj.png",
        "badges" => ["GMP", "CoA"]
    ],
];
?>
<style>
.products-section{
    max-width:1100px;
    margin:60px auto;
    padding:0 40px;
    font-family:'Inter',Arial,sans-serif;
}
.products-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}
.products-header h2{
    font-size:26px;
    font-weight:700;
}
.products-header span{
    font-size:14px;
    color:#6b7280;
}
.filter-row{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    margin-bottom:30px;
}
.filter-pill{
    padding:6px 14px;
    border-radius:20px;
    background:#f3f4f6;
    font-size:14px;
    cursor:pointer;
}
.filter-pill.active{
    background:#e6f2f3;
    color:#176b72;
    font-weight:600;
}
.products-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:25px;
}
.product-card{
    background:#fff;
    border-radius:20px;
    box-shadow:0 4px 20px rgba(0,0,0,0.06);
    overflow:hidden;
}
.product-img{
    height:160px;
    background:#f1f1f1;
    position:relative;
}
.product-img img{
    width:100%;
    height:100%;
    object-fit:contain;
    display:block;
    padding:10px;
}
.badges{
    position:absolute;
    top:10px;
    left:10px;
    display:flex;
    gap:6px;
}
.badge{
    font-size:12px;
    padding:3px 8px;
    border-radius:12px;
    background:#e5f7ed;
    color:#16a34a;
}
.badge.blue{background:#e0ecff;color:#2563eb;}
.badge.orange{background:#fff3cd;color:#d97706;}
.product-body{
    padding:16px;
}
.product-body h3{
    font-size:15px;
    margin-bottom:4px;
}
.product-body p{
    font-size:14px;
    color:#4b5563;
}
.product-pack{
    font-size:13px;
    color:#6b7280;
    margin:6px 0;
}
.price{
    font-size:18px;
    font-weight:700;
    margin:10px 0;
}
.actions{
    display:flex;
    gap:10px;
    align-items:center;
}
.btn-price{
    background:#2f7f8f;
    color:#fff;
    padding:10px 18px;
    border-radius:20px;
    border:none;
    cursor:pointer;
}
.product-whatsapp{
    width:38px;
    height:38px;
    border-radius:50%;
    border:1px solid #d1fae5;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#22c55e;
    font-size: 18px;
    transition: all 0.3s ease;
}

.product-whatsapp:hover {
    background-color: #22c55e;
    color: white;
    border-color: #22c55e;
}
.hidden{display:none;}

/* Filter Styles */
.filter-container {
    margin: 20px 0;
    width: 100%;
}

.filter-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-label {
    font-size: 14px;
    color: #4a5568;
    margin-right: 5px;
    font-weight: 500;
}

.filter-pill {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    background-color: #f1f5f9;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}

.filter-pill.active {
    background-color: #e0f2fe;
    color: #0369a1;
    border-color: #0ea5e9;
    font-weight: 500;
}

.filter-separator {
    width: 1px;
    height: 20px;
    background-color: #e2e8f0;
    margin: 0 5px;
}

.filter-pill:hover {
    background-color: #e2e8f0;
}

.filter-pill.active:hover {
    background-color: #bae6fd;
}

@media (max-width: 992px){
    .products-grid{grid-template-columns:repeat(2,1fr);}
}

@media (max-width: 768px){
    .products-section{padding:0 16px; margin:40px auto;}
    .products-header{flex-direction:column; align-items:flex-start; gap:6px;}
    .products-header h2{font-size:22px;}
    .product-img{height:140px;}
    .actions{flex-wrap:wrap;}
    .btn-price{flex:1; min-width: 160px;}
}

@media (max-width: 576px){
    .products-grid{grid-template-columns:1fr; gap:18px;}
}
</style>
<div class="products-section">

    <div class="products-header">
        <h2>Agrosaf Products containing Empacon</h2>
        <span id="productCount"><?php echo count($products); ?> products</span>
    </div>

    <div class="filter-container">
        <div class="filter-row">
            <span class="filter-label">Filter:</span>
            <div class="filter-pill" data-filter="Capsule">Capsule</div>
            <div class="filter-pill" data-filter="Injection">Injection</div>
            <div class="filter-separator"></div>
            <div class="filter-pill" data-filter="50 mg">50 mg</div>
            <div class="filter-pill" data-filter="100 mg">100 mg</div>
            <div class="filter-pill" data-filter="200 mg">200 mg</div>
        </div>
    </div>

    <div class="products-grid" id="productsGrid">
        <?php foreach($products as $p): ?>
            <div class="product-card"
                 data-form="<?php echo $p['form']; ?>"
                 data-strength="<?php echo $p['strength']; ?>">

                <div class="product-img">
                    <?php if(!empty($p['image'])): ?>
                        <img src="<?php echo asset($p['image']); ?>" alt="<?php echo htmlspecialchars($p['name']); ?>">
                    <?php endif; ?>
                     <div class="badges">
                         <?php foreach($p['badges'] as $b): ?>
                             <span class="badge <?php echo $b=='CoA'?'blue':($b=='Bestseller'?'orange':''); ?>">
                                 <?php echo $b; ?>
                             </span>
                         <?php endforeach; ?>
                     </div>
                 </div>

                <div class="product-body">
                    <h3><?php echo $p['name']; ?></h3>
                    <p><?php echo $p['strength']; ?> • <?php echo $p['form']; ?></p>
                    <div class="product-pack"><i class="fas fa-box" style="margin-right: 5px;"></i> <?php echo $p['pack']; ?></div>

                    <div class="price">
                        ₹<?php echo $p['price']; ?>
                        <span style="font-size:12px;color:#6b7280;">MRP</span>
                    </div>

                    <div class="actions">
                        <button class="btn-price" style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                            <i class="fas fa-tag"></i> Get Pricing
                        </button>
                        <a href="https://wa.me/919999999999?text=Hi,%20I'm%20interested%20in%20<?php echo urlencode($p['name'] . ' (' . $p['strength'] . ' - ' . $p['form'] . ')'); ?>" class="product-whatsapp" target="_blank" style="text-decoration: none;">
            <i class="fab fa-whatsapp"></i>
        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

</div>

<script>
const filters = document.querySelectorAll('.filter-pill');
const cards = document.querySelectorAll('.product-card');
const countEl = document.getElementById('productCount');

filters.forEach(filter => {
    filter.addEventListener('click', () => {

        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        let value = filter.dataset.filter;
        let visible = 0;

        cards.forEach(card => {
            let form = card.dataset.form;
            let strength = card.dataset.strength;

            if(value === 'all' || form === value || strength.includes(value)){
                card.classList.remove('hidden');
                visible++;
            } else {
                card.classList.add('hidden');
            }
        });

        countEl.innerText = visible + " products";
    });
});
</script>

<!-- Combinations & Variants -->
<?php   
$combo_molecules = ["Vitamin B Complex", "Omega-3", "Lycopene", "Coenzyme Q10"];
$strengths = ["50 mg", "100 mg", "200 mg"];
$forms = ["Tablet", "Capsule", "Injection"];
?>
<style>
.combination-section{
    max-width:1200px;
    margin:60px auto;
    padding:0 40px;
    font-family:'Inter',Arial,sans-serif;
}

.combo-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

.combo-header h2{
    font-size:24px;
    font-weight:700;
}

.combo-header a{
    font-size:14px;
    color:#176b72;
    text-decoration:none;
    font-weight:600;
}

.combo-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 28px 600px 28px 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);    
    box-sizing: border-box;
}

.combo-block{
    margin-bottom:22px;
}

.combo-label{
    font-size:14px;
    color:#6b7280;
    margin-bottom:8px;
}

.combo-pills{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
}

.combo-pill{
    padding:7px 16px;
    border-radius:20px;
    background:#f5f7fa;
    font-size:14px;
    color:#1f2d3d;
    border:1px solid #e5e7eb;
}

@media (max-width: 768px){
    .combination-section{padding:0 16px; margin:40px auto;}
    .combo-header{flex-direction:column; align-items:flex-start; gap:8px;}
    .combo-card{padding:20px 16px !important;}
}
</style>
<div class="combination-section">

    <div class="combo-header">
        <h2>Combinations & Variants</h2>
        <a href="#" style="display: flex; align-items: center; gap: 5px;">View all <i class="fas fa-arrow-right" style="font-size: 12px;"></i></a>
    </div>

    <div class="combo-card">

        <!-- With other molecules -->
        <div class="combo-block">
            <div class="combo-label">With other molecules:</div>
            <div class="combo-pills">
                <?php foreach($combo_molecules as $m): ?>
                    <div class="combo-pill">+ <?php echo $m; ?></div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- By strength -->
        <div class="combo-block">
            <div class="combo-label">By strength:</div>
            <div class="combo-pills">
                <?php foreach($strengths as $s): ?>
                    <div class="combo-pill"><?php echo $s; ?></div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- By form -->
        <div class="combo-block" style="margin-bottom:0;">
            <div class="combo-label">By form:</div>
            <div class="combo-pills">
                <?php foreach($forms as $f): ?>
                    <div class="combo-pill"><?php echo $f; ?></div>
                <?php endforeach; ?>
            </div>
        </div>

    </div>

</div>
<!-- FAQ -->
 <?php
$faqs = [
    [
        "q" => "What forms and strengths of Empacon does Agrosaf provide?",
        "a" => "Agrosaf provides Empacon in Tablet, Capsule, and Injection forms. Common strengths include 50 mg, 100 mg, and 200 mg depending on the SKU."
    ],
    [
        "q" => "What are the typical pack sizes and dispatch timelines?",
        "a" => "Standard pack sizes include 10×10 blister packs for tablets/capsules and 10×1 ampoules for injections. Dispatch is typically completed within 24–48 hours for confirmed orders."
    ],
    [
        "q" => "Is Certificate of Analysis (CoA) available for Empacon products?",
        "a" => "Yes, Certificate of Analysis (CoA) and other regulatory documents are available on request for all Empacon SKUs."
    ],
    [
        "q" => "What is the MOQ and how can I get distributor pricing?",
        "a" => "MOQ depends on the specific product and strength. You can request distributor pricing via the ‘Get Pricing’ button or contact the Agrosaf sales team directly."
    ],
    [
        "q" => "What are the storage and handling requirements?",
        "a" => "Empacon products should be stored in a cool, dry place away from direct sunlight, as per standard pharmaceutical storage guidelines. Injections should be protected from freezing."
    ],
    [
        "q" => "Does Agrosaf offer Empacon combinations with other molecules?",
        "a" => "Yes, Agrosaf offers Empacon combinations with molecules such as Vitamin B Complex, Omega-3, Lycopene, and Coenzyme Q10 in selected strengths and dosage forms."
    ]
];
?>
<style>
.faq-section {
    max-width: 900px;
    margin: 60px auto;
    padding: 0 40px;
    font-family: 'Inter', Arial, sans-serif;
}

.faq-section h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2d3d;
    margin: 0 0 25px 0;
    text-align: center;
}

.faq-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border: 1px solid #e5e7eb;
}

.faq-item {
    border-bottom: 1px solid #e5e7eb;
    transition: all 0.2s ease;
}

.faq-item:last-child {
    border-bottom: none;
}

.faq-question {
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    color: #1f2d3d;
    background: #fff;
    transition: all 0.2s ease;
}

.faq-question:hover {
    background: #f9fafb;
}

.faq-arrow {
    transition: transform 0.3s ease;
    color: #6b7280;
    font-size: 18px;
    margin-left: 15px;
    flex-shrink: 0;
}

.faq-answer {
    padding: 0 25px 0 25px;
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    margin: 0;
}

.faq-item.active .faq-question {
    background: #f8fafc;
    color: #176b72;
}

.faq-item.active .faq-answer {
    padding: 0 25px 20px 25px;
    max-height: 500px;
    opacity: 1;
    display: block;
}

.faq-item.active .faq-arrow {
    transform: rotate(180deg);
    color: #176b72;
}

@media (max-width: 768px){
    .faq-section{padding:0 16px; margin:40px auto;}
    .faq-question{padding:16px 16px;}
    .faq-item.active .faq-answer{padding:0 16px 16px 16px;}
}
</style>
<div class="faq-section">

    <h2>Frequently Asked Questions</h2>

    <div class="faq-card">

        <?php foreach($faqs as $index => $faq): ?>
            <div class="faq-item">
                
                <div class="faq-question">
                    <?php echo $faq['q']; ?>
                    <span class="faq-arrow">
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L8 8L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div>

                <div class="faq-answer">
                    <?php echo $faq['a']; ?>
                </div>

            </div>
        <?php endforeach; ?>

    </div>
</div>

<script>
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {

        const item = question.parentElement;
        const openItem = document.querySelector('.faq-item.active');

        if(openItem && openItem !== item){
            openItem.classList.remove('active');
        }

        item.classList.toggle('active');
    });
});
</script>

<script>
(function() {
    function setHeaderHeight() {
        var header = document.querySelector('header.header');
        if (!header) return;
        var height = header.offsetHeight || 0;
        if (height) {
            document.documentElement.style.setProperty('--agro-header-height', height + 'px');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setHeaderHeight);
    } else {
        setHeaderHeight();
    }

    window.addEventListener('load', setHeaderHeight);
    window.addEventListener('resize', setHeaderHeight);
})();
</script>

     </div>
     </div>
 </body>
 </html>
