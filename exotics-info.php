<?php
    include_once 'nav.php';
?>

    <div class="container">
      <h1 class="my-4 text-center">Exotics</h1>

      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <td><input type="text" class="form-control" id="nameFilter" placeholder="Filter"></td>
            <td><input type="text" class="form-control" id="speciesFilter" placeholder="Filter"></td>
            <td><input type="text" class="form-control" id="sexFilter" placeholder="Filter"></td>
            <td><input type="text" class="form-control" id="neuteredFilter" placeholder="Filter"></td>
            <td><input type="text" class="form-control" id="ageFilter" placeholder="Filter"></td>
            <td><input type="text" class="form-control" id="" placeholder="" disabled></td>
            <td><input type="text" class="form-control" id="" placeholder="" disabled></td>
          </tr>
          <tr id="headers">
            <th scope="col" title="Name of the Exotic" id="Name" class="clickable">Name</th>
            <th scope="col" id="Species" class="clickable">Species</th>
            <th scope="col" id="Sex" class="clickable">Sex</th>
            <th scope="col" id="Neutered" class="clickable">Neutered</th>
            <th scope="col" id="Age" class="clickable" title="In months">Age</th>
            <th scope="col">Owners</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody id="exoticTable">
        </tbody>
      </table>

    <?php
      include_once 'pageLinks.php';
    ?>
      
    </div>

    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Notes</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="modalBody">
    
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Owners</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="modalOwners">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
    src="https://code.jquery.com/jquery-3.3.1.js"
    integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
    crossorigin="anonymous"></script>    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
    <script src="loadExotics.js"></script>
    <script src="sortFiltPag.js"></script>
  </body>
</html>