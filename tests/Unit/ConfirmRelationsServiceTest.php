<?php

use PHPUnit\Framework\TestCase;
use App\Services\ConfirmRelationsService;

class ConfirmRelationsServiceTest extends TestCase
{
    
    public function testRelationsForming() 
    {
        $service = new ConfirmRelationsService();

        $columns = [
            'ralShortInfoView.RegNumber',
            'ralShortInfoView.fullName',
            'anotherRelation.someField',
            'plainColumn',
        ];

        $expected = [
            'ralShortInfoView:id,RegNumber,fullName',
            'anotherRelation:id,someField',
        ];

        $result = $service->prepareRalations($columns);

        $this->assertEqualsCanonicalizing($expected, $result);
    }

    public function testEmptyArrayReturnIfNoRelations()
    {
        $service = new ConfirmRelationsService();

        $columns = [
            'RegNumber',
            'fullName',
            'someField',
            'plainColumn',
        ];

        $expected = [];

        $result = $service->prepareRalations($columns);

        $this->assertEqualsCanonicalizing($expected, $result);

    }

}