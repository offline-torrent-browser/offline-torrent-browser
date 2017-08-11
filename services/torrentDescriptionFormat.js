function format(description) {
  description = description.replace(/\\n/g,"\n");

  detailsNamesRegexp.forEach(function(nameRegexp, index) {
    description = description.replace(nameRegexp, detailsNameTranslated[index]);
  })
  return description;
}

exports.format = format;

var detailsNames = [
'{Yes}', '>File_info<', '>Hardware<', '>descr',
 '>language', '>year', '>sound', '>video',
 '>sample', '>runtime', '>serial', '>movie_translated_name',
 '>movie_original_name', '>movie_genres_list_ids', '>season',
 '>episode', '>subtitles', '>movie_quality', '>directed',
 '>name', '>bookz_author', '>artist', '>title', '>actors', '>writing_by',
 '>bookz_genre', '>appz_version', '>appz_license', '>appz_os', '>music_genre',
 '>music_format', '>music_bitrate', '>games_recomanded_hardware', '>games_genre',
 '>games_minimum_hardware', '>sport_genre', '>anime_genre', '>dvd_genre',
'>country', '>hdtv_quality'];

var detailsNameTranslated = [
'Da', '>Fişier<', '>Cerinţe<', '>Despre %category%',  '>Limba',  '>An',  '>Sunet',
'>Video', '>Sample', '>Durata', '>Serial', '>Denumire', '>Denumirea originală',
 '>Gen', '>Sezon', '>Episod', '>Subtitrare', '>Calitate', '>Regizor', '>Denumire',
 '>Autor', '>Artist', '>Denumire', '>Actori', '>Autorul scenariului', '>Gen', '>Versiune',
 '>Licen&#355;a', '>Sistem de operare', '>Gen', '>Format', '>Bitrate', '>Hardware recomandat',
 '>Gen', '>Hardware minim', '>Gen', '>Tip', '>Tip', '>Țara',
 '>Calitatea HDTV'];

detailsNames.push('language_type\\{1\\}')
detailsNameTranslated.push('Original (fără traducere)')
detailsNames.push('language_type\\{5\\}')
detailsNameTranslated.push('Amator (o voce)')
detailsNames.push('language_type\\{7\\}')
detailsNameTranslated.push('Amator (două voci)')
detailsNames.push('language_type\\{4\\}')
detailsNameTranslated.push('Amator (mai multe voci)')
detailsNames.push('language_type\\{8\\}')
detailsNameTranslated.push('Profesionistă (o voce)')
detailsNames.push('language_type\\{9\\}')
detailsNameTranslated.push('Profesionistă (două voci)')
detailsNames.push('language_type\\{3\\}')
detailsNameTranslated.push('Profesionistă (mai multe voci, voice-over)')
detailsNames.push('language_type\\{2\\}')
detailsNameTranslated.push('Profesionistă (dublată)')
detailsNames.push('language_type\\{6\\}')
detailsNameTranslated.push('Traducere sincronizată')

var detailsNamesRegexp = detailsNames.map(
  function(text) {
    return new RegExp(text, 'gi');
  }
);

/**
 * Russian translation, todo..
$lang_input_all_names = array('{Yes}','>File_info<','>Hardware<','>descr', '>language', '>year', '>sound', '>video', '>sample', '>runtime', '>serial', '>movie_translated_name', '>movie_original_name', '>movie_genres_list_ids', '>season', '>episode', '>subtitles', '>movie_quality', '>directed', '>name', '>bookz_author', '>artist', '>title', '>actors', '>writing_by', '>bookz_genre', '>appz_version', '>appz_license', '>appz_os', '>music_genre', '>music_format', '>music_bitrate', '>games_recomanded_hardware', '>games_genre', '>games_minimum_hardware', '>sport_genre', '>anime_genre','>dvd_genre','>country', '>hdtv_quality');
$lang_input_all_values = array('Да','>Файл<','>Требования<','>О %category%', '>Язык', '>Год выхода', '>Звук', '>Видео', '>Сэмпл', '>Продолжительность', '>Сериал', '>Название', '>Оригинальное название', '>Жанр', '>Сезон', '>Серия', '>Субтитры', '>Качество', '>Режиссер', '>Название', '>Автор', '>Артист', '>Название', '>В ролях', '>Автор сценариев', '>Жанр', '>Версия', '>Лицензия', '>Операционая система', '>Жанр', '>Формат', '>Битрэйт', '>Системные требования', '>Жанр', '>Минимальные системные требования', '>Жанр', '>Тип', '>Тип', '>Страна', '>Качество HDTV');

$translation_type_tr = array(
  '1'=>'Оригинал (без перевода)',
    '5'=>'Любительский (одноголосный)',
    '7'=>'Любительский (двухголосый)',
  '4'=>'Любительский (многоголосый)',
    '8'=>'Профессиональный (одноголосный)',
    '9'=>'Профессиональный (двухголосый)',
    '3'=>'Профессиональный (многоголосый, закадровый)',
  '2'=>'Профессиональный (полное дублирование)',
  '6'=>'Синхронный перевод'
);
 */