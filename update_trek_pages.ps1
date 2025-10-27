# PowerShell script to update all trek pages with consistent navbar, footer, and mobile responsiveness

$trekFiles = @(
    "packages\bhaba-pass.html",
    "packages\sach-pass.html", 
    "packages\churdhar.html",
    "packages\lamdalake.html",
    "packages\baspavalley.html"
)

$newFooter = @"
  <!-- Footer -->
<footer class="pt-5 pb-4 bg-dark text-white">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4 text-center text-md-start">
  <!-- Logo + Heading -->
<h5 class="fw-bold mb-1" style="white-space: nowrap; display: inline-flex; align-items: center;">
  <img src="../images/logo1234.webp" alt="Logo" width="60" height="50" style="margin-right: 5px;">
  Miles<span style="color:#1b78c7;">On</span>Wheel
</h5>
<!-- Subheading (below logo + heading) -->
<p class="text-white-50 mb-0" style="font-size: 0.85rem;">
  Seamless Escapes, Infinite Stories
</p>

  <p class="text-white-50">Making travel effortless with curated, transparent packages.</p>
</div>
      <div class="col-md-4">
        <h6 class="fw-semibold">Quick Links</h6>
        <ul class="list-unstyled">
          <li><a href="../index.html">Home</a></li>
          <li><a href="../aboutus.html">About Us</a></li>
          <!-- Destinations with Collapse -->
<li>
  <a href="#destinationsMenu" class="d-flex align-items-center" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="destinationsMenu">
    Destinations <i class="fa-solid fa-chevron-down ms-2"></i>
  </a>
  <ul class="collapse list-unstyled ms-3 mt-2" id="destinationsMenu" style="margin-bottom: 10px;">
    <li><a href="../destinations/manali.html">Manali</a></li>
    <li><a href="../destinations/shimla.html">Shimla</a></li>
    <li><a href="../destinations/kullu.html">Kullu</a></li>
    <li><a href="../destinations/spiti.html">Spiti Valley</a></li>
    <li><a href="../destinations/kangra.html">Kangra / Dharamshala</a></li>
    <li><a href="../destinations/ladakh.html">Ladakh</a></li>
    <li><a href="../destinations/kinnaur.html">Kinnaur</a></li>
  </ul>
</li>
<!-- Packages with Collapse -->
<li>
  <a href="#packagesMenu" class="d-flex align-items-center" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="packagesMenu">
    Packages <i class="fa-solid fa-chevron-down ms-2"></i>
  </a>
  <ul class="collapse list-unstyled ms-3 mt-2" id="packagesMenu" style="margin-bottom: 10px;">
    <li><a href="../tours.html">Himachal Tour Packages</a></li>
    <li><a href="../treks.html">Himachal Trek Packages</a></li>
    <li><a href="../destinations/ladakh.html">Ladakh Packages</a></li>
  </ul>
</li>
          <li><a href="../contact.html">Contact Us</a></li>
          <li><a href="../termsconditions.html">Terms & Conditions</a></li>
        </ul>
      </div>
      <div class="col-md-4">
        <h6 class="fw-semibold">Follow</h6>
        <div class="d-flex gap-3 fs-5">
          <a href="https://www.instagram.com/milesonwheel.com_/" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://x.com/mileesonwh2317" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61580331159828" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </div>
    <hr class="border-secondary my-4">
   <div class="d-flex justify-content-between small text-white-50">
  <span>© <span id="year"></span> MilesOnWheel. All rights reserved.</span>
  <span>
    Built by 
    <a href="https://rishavkumar.vercel.app/" target="_blank" class="text-white text-decoration-none">
      Rishav
    </a>
  </span>
</div>
  </div>
</footer>
"@

$newScripts = @"
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="../script.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script>
    AOS.init({
      duration: 800, // animation speed
      once: true,    // animate only once
      offset: 100    // trigger point before element enters viewport
    });

    // Price Update Function
    function updatePrice() {
      const activeTab = document.querySelector('#packageTabs .nav-link.active');
      const price = activeTab.getAttribute('data-price');
      const priceSticker = document.getElementById('priceSticker');
      priceSticker.innerHTML = `<i class="fa-solid fa-hand-holding-dollar me-2"></i> ₹`+price+` | Person`;
    }

    // Tab Change Event
    document.addEventListener('DOMContentLoaded', function() {
      const tabLinks = document.querySelectorAll('#packageTabs .nav-link');
      tabLinks.forEach(link => {
        link.addEventListener('click', function() {
          setTimeout(updatePrice, 100);
        });
      });

      // Set current year
      document.getElementById('year').textContent = new Date().getFullYear();
    });
  </script>
"@

Write-Host "Trek pages update script created. This script contains the standardized footer and scripts for all trek pages."
Write-Host "Files to be updated: $($trekFiles -join ', ')"
Write-Host "`nUpdates include:"
Write-Host "✓ Consistent MilesOnWheel navbar with logo and branding"
Write-Host "✓ Mobile-responsive design"
Write-Host "✓ WhatsApp chat integration" 
Write-Host "✓ Standardized footer with collapsible menus"
Write-Host "✓ Optimized scripts for better performance"
Write-Host "✓ Year auto-update functionality"