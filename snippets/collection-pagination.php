<?php if (isset($collection) && $collection->count() > 0) : ?>
<?php $pagination = $collection->pagination() ?>
<nav class='collection-pagination' data-top="<?php echo $top ?? null ?>" data-content="<?php echo $content ?? null ?>">
  <ul>
    <?php if ($pagination->hasPrevPage()) : ?>
    <li class="collection-pagination__item collection-pagination__item--to-first">
      <a href="<?php echo $pagination->firstPageURL() ?>" data-page="1">
        <span class="collection-pagination__icon collection-pagination__icon--first"></span>
      </a>
    </li>
    <li class="collection-pagination__item collection-pagination__item--to-sibling">
      <a href="<?php echo $pagination->prevPageURL() ?>" data-page="<?php echo $pagination->prevPage() ?>">
        <span class="collection-pagination__icon collection-pagination__icon--prev"></span>
      </a>
    </li>
    <?php endif ?>

    <?php foreach ($pagination->range($range ?? 10) as $r) : ?>
    <li class="collection-pagination__item collection-pagination__item--to-number">
      <a
      <?php
      echo attr([
        'href' => $pagination->pageURL($r),
        'data-page' => $r,
        'aria-current' => $pagination->page() === $r ? 'page' : null,
      ])
      ?>
      >
        <?php echo $r ?>
      </a>
    </li>
    <?php endforeach ?>

    <?php if ($pagination->hasNextPage()) : ?>
    <li class="collection-pagination__item collection-pagination__item--to-sibling">
      <a href="<?php echo $pagination->nextPageURL() ?>" data-page="<?php echo $pagination->nextPage() ?>">
        <span class="collection-pagination__icon collection-pagination__icon--next"></span>
      </a>
    </li>
    <li class="collection-pagination__item collection-pagination__item--to-last">
      <a href="<?php echo $pagination->lastPageURL() ?>" data-page="<?php echo $pagination->lastPage() ?>">
        <span class="collection-pagination__icon collection-pagination__icon--last"></span>
      </a>
    </li>
    <?php endif ?>
  </ul>
</nav>
<script>

</script>
<?php endif ?>
